import type { NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prismaClient";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET as string,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("authorize", credentials);
        // check to see if email and password is there
        if (!credentials?.email || !credentials.password) {
          // throw new Error('Please enter an email and password')
          return null;
        }

        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if no user was found
        if (!user || !user?.hashedPassword) {
          throw new Error("No user found");
        }

        // check to see if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // if password does not match
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
