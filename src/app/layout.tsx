import "./globals.css";

import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import ToastContext from "@/context/ToastContext";

import clsx from "clsx";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "conversify",
  description: "realtime chat application built with next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(font.className, "bg-[#121214] text-[#f4f4f5]")}>
        <ToastContext />
        {children}
      </body>
    </html>
  );
}
