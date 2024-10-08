import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import "./globals.css";
import "./utils.css";

import { cn } from "@/src/utils/cn";
import { Header } from "../src/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          inter.className,
          GeistMono.variable,
          GeistSans.variable,
          "min-h-full flex flex-col bg-base-100 px-2 text-base-content gap-4"
        )}
      >
        <Header />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
