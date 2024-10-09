import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuthProvider from "./providers/NextAuthProvider";
import ReactQueryClientProvider from "./providers/ReactQueryClientProvider";
import ToastProvider from "./providers/ToastProvider";
import { Knock } from "@knocklabs/node";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Marketplace description",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  // console.log(session);
  // const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);
  // const knockUser = await knockClient.users.identify(
  //   session?.user.id as string,
  //   {
  //     name: session?.user.name,
  //     email: session?.user.email,
  //   }
  // );

  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <NextAuthProvider>
            <Navbar />
            {children}
            <ToastProvider />
          </NextAuthProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
