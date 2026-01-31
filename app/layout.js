import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "春节聚会邀请 | Chinese New Year Celebration",
  description: "一起准备春节大餐、手工坊和游戏之夜！",
  icons: [
    {
      rel: "icon",
      url: "/icon-32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "apple-touch-icon",
      url: "/icon-180.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      rel: "shortcut icon",
      url: "/icon-32.png",
      sizes: "32x32",
      type: "image/png",
    },
  ],
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-950`}
      >
        {children}
      </body>
    </html>
  );
}
