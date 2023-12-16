import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Menu from "./components/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D&D XE",
  description: "Custom D&D player app",
};

const dummyLinks = [{ path: "/", label: "Home" }];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Menu links={dummyLinks} />
        </header>
        <main>{children}</main>
        <footer>footer</footer>
      </body>
    </html>
  );
}
