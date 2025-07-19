

import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
// Remove duplicate import since it's already imported at the bottom
// Remove duplicate Toaster import since it's imported at the bottom

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LaunchMate AI - Launch Your Digital Products with AI",
  description: "AI-powered platform for solopreneurs to generate launch emails, social media hooks, and sales copy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";

