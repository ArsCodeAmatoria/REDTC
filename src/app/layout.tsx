import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  title: "REDTC - Red Seal Tower Crane Exam Practice",
  description: "Practice for your Red Seal Tower Crane certification exam with comprehensive multiple choice questions and detailed explanations.",
  keywords: ["tower crane", "red seal", "exam", "practice", "certification", "crane operator", "BC", "British Columbia"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "REDTC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen flex flex-col`}>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
