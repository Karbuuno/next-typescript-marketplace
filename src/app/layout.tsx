import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuthProvider from "./providers/NextAuthProvider";
import ReactQueryClientProvider from "./providers/ReactQueryClientProvider";
import ToastProvider from "./providers/ToastProvider";
// import NextAuthProvider from "./providers/NextAuthProvider";

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
  // const session = await getServerSession(authOptions);

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
