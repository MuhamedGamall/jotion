import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import { Toaster } from "sonner";
import LoaderProvider from "@/components/providers/LoaderProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jotion",
  description: "The connected workspace where better, faster work happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClerkProvider>
          <LoaderProvider />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="jotion-theme"
          >
            <Toaster expand={false} theme="dark" />
            {children}
          </ThemeProvider>
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
