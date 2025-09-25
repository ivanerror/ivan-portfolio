import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DynamicFavicon from "@/components/ui/dynamic-favicon";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Gabriel Ivan Setyaputra - Software Engineer Portfolio",
    template: "%s | Gabriel Ivan Setyaputra"
  },
  description: "Experienced Software Engineer with expertise in Flutter, React.js, and web/mobile development. Improved user engagement and optimized processes at Grab.",
  keywords: [
    "Software Engineer",
    "Flutter Developer",
    "React.js Developer",
    "Mobile Development",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "Gabriel Ivan Setyaputra"
  ],
  authors: [{ name: "Gabriel Ivan Setyaputra" }],
  creator: "Gabriel Ivan Setyaputra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gabrielivan.dev",
    title: "Gabriel Ivan Setyaputra - Software Engineer Portfolio",
    description: "Experienced Software Engineer with expertise in Flutter, React.js, and web/mobile development.",
    siteName: "Gabriel Ivan Setyaputra Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Ivan Setyaputra - Software Engineer Portfolio",
    description: "Experienced Software Engineer with expertise in Flutter, React.js, and web/mobile development.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: '/light_favicon_io/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}>
        <DynamicFavicon />
        {children}
      </body>
    </html>
  );
}
