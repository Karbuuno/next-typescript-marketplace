import type { NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma/prismaClient";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      // credentials: {
      //   email: { label: "Email", type: "text", placeholder: "Your Email" },
      //   password: { label: "Password", type: "password" },
      // },

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log(credentials);
        // check to see if email and password is there
        if (!credentials?.email || !credentials?.password) {
          // throw new Error('Please enter an email and password')
          return null;
        }

        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        console.log(user);

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
  callbacks: {
    jwt: async ({ token }) => {
      const userInfo = await prisma.user.findFirst({
        where: { email: token.email },
      });

      if (userInfo) {
        userInfo.emailVerified = undefined!;
        userInfo.hashedPassword = undefined!;
      }
      token.user = userInfo;
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user!;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
