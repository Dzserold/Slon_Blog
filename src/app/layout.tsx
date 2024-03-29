import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Nav from "@/components/Nav";

const oswald = Oswald({
  weight: ["300", "400", "500", "600", "700"],
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
      <body className={`${oswald.className} bg-dark text-light`}>
        <Nav />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
