import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Theme from "./Theme";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import User from "@/components/ui/User";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Home | MacVG",
  description:
    "MacVG is the best online gaming platform on the web! Play 500+ free unblocked games on MacVG! From action and puzzle to retro classics, enjoy online gaming anytime, anywhere.",
  authors: [{ name: "MacWeb", url: "https://macweb.app" }],
  openGraph: {
    title: "MacVG",
    description:
      "MacVG is the best online gaming platform on the web! Play 500+ free unblocked games on MacVG! From action and puzzle to retro classics, enjoy online gaming anytime, anywhere.",
    url: "https://macvg.macweb.app",
    siteName: "MacVG",
    images: [
      {
        url: "/logo.png",
        width: 200,
        height: 200,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Theme>
          <Nav>
            <User />
          </Nav>
          {children}
          <Footer />
        </Theme>
      </body>
      <GoogleAnalytics gaId="G-Y71QM9DR66" />
    </html>
  );
}
