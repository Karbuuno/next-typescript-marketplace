import NextAuth, { DefaultSession } from "next-auth";

// Extend the default session interface
declare module "next-auth" {
  interface Session {
    user: {
      /** The user's unique ID */
      id: string;
      /** The user's name */
      name: string;
      /** The user's email */
      email: string;
      /** The user's role */
      role: string;
      /** The user's image */

      image?: string;
    } & DefaultSession["user"];
  }
}
