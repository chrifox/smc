import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Menu from "./components/Menu";
import UserContextProvider from "./context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D&D XE",
  description: "Custom D&D player app",
};

const links = [
  { path: "/user/player/generate-character", label: "Generate Character" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <header>
          <Menu links={links} />
        </header>
        <UserContextProvider>
          <main className="pt-4 px-8 pb-8">{children}</main>
        </UserContextProvider>
      </body>
    </html>
  );
}
