import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Pengumuman Hasil Recruitment - BSC UNNES 2026",
  description: "Pengumuman hasil recruitment Broadcasting Students Club Universitas Negeri Semarang periode 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon/favicon.ico" />
        <meta name="theme-color" content="#021550" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
