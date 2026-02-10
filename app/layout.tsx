import type { Metadata } from "next";
import { Manrope } from "next/font/google";
// import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Summit B2B - Premium SaaS Solution",
  description: "Accelerate your business with our premium B2B platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
    <html lang="en">
      <body
        className={`${manrope.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
    // </ClerkProvider>
  );
}
