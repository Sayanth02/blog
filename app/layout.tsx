import type { Metadata } from "next";
import {  Lato, Questrial } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/NavBar";

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: "400",
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Blog Portfolio",
  description: "A personal blog and portfolio website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${questrial.variable} ${lato.variable} antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
