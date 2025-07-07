import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import AuthProvider from "@/components/AuthProvider";
import { getSession } from "@/lib/auth";
import { ViewTransitions } from "next-view-transitions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixory",
  description: "Free photos and videos website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <ViewTransitions>
      <html lang="en">
        <link rel="icon" type="image/png" href="/pixoryIcon.png" />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ReactQueryProvider>
            <AuthProvider session={session}>{children}</AuthProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
