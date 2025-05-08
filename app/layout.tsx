import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { DevFool } from "@/components/DevFool";

const font_Space_Mono = Space_Mono({ weight: ["700", "400"], display: "swap" });

export const metadata: Metadata = {
  title: "##############",
  description: "##############",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font_Space_Mono.className} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
        <CustomCursor />
        <DevFool />
      </body>
    </html>
  );
}
