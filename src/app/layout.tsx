import type { Metadata } from "next";
import { Special_Elite, Playfair_Display } from "next/font/google";
import "./globals.css";

const specialElite = Special_Elite({
  weight: "400",
  variable: "--font-special-elite",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Editorial - Investigative Newsroom Simulator",
  description: "A realistic investigative newsroom simulation game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${specialElite.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <main className="flex-grow flex flex-col relative w-full h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
