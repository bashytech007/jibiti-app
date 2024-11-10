import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link"
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nextjs Jibiti App",
  description: "Jibiti brought to you by nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} px-2 md:px-5 antialiased`}
      >
        <header className="text-white font-bold bg-green-900 text-2xl">
         <div className="flex flex-grow">
          <Link href="/">Jibiti-Chat</Link>
          <Link href="/about" className="font-light ml-5">About</Link>
          </div>
        </header>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow">

        {children}
          </div>
          </div>
      </body>
    </html>
  );
}
