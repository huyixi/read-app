import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "huyixi's Read",
  description: "Share huyixi's reading thoughts and experiences",
};

const tsangerJinKai03 = localFont({
  src: [
    {
      path: "../../public/fonts/tsangerJinKai03-W04.ttf",
      weight: "400",
      style: "normal",
      variable: "--font-tsangerJinKai03",
    },
    {
      path: "../../public/fonts/tsangerJinKai03-W05.ttf",
      weight: "700",
      style: "medium",
      variable: "--font-tsangerJinKai03",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={tsangerJinKai03.className}>{children}</body>
    </html>
  );
}
