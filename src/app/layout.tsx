import type { Metadata } from "next";
import { Caudex } from "next/font/google";
import "./globals.css";
import Nav from "@/lib/components/Nav";

const caudex = Caudex({
  weight: ["400", "700"],
  style: "normal",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Slon Blog",
  description: "The best blogs just here just now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${caudex.className} bg-dark text-light`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
