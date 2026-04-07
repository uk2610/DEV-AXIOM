import { baseUrl, keywords } from "@/utils/metadata";
import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Sora, IBM_Plex_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import Analytics from "@/components/analytics/analytics";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: "%s | Dev Axioms",
    default: "Dev Axioms",
  },
  description:
    "All in one platform to learn and practice interview questions as a developer.",
  keywords: keywords,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${plexMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
