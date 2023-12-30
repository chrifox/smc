import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Menu from "./components/element/Menu";
import UserContextProvider from "./context/UserContext";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D&D XE",
  description: "Custom D&D player app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen overflow-x-hidden`}>
        <UserContextProvider>
          <>
            <header>
              <Menu />
            </header>
            <main className="pt-4 px-8 pb-8">
              <div className="flex flex-col items-center">{children}</div>
            </main>
          </>
        </UserContextProvider>
      </body>
    </html>
  );
}
