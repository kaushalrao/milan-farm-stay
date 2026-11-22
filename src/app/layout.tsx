import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import InstallPrompt from "@/components/InstallPrompt";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SearchProvider } from "@/context/SearchContext";
import SearchModal from "@/components/search/SearchModal";
import SearchTargetWatcher from "@/components/search/SearchTargetWatcher";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Milan Farm Stays | Guest Itinerary",
  description: "Curated road trips, hidden gems & unforgettable coffee estate experiences at Milan Farm Stays.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Milan Farm",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script src="https://unpkg.com/@phosphor-icons/web" strategy="beforeInteractive" />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-text-main font-sans overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SearchProvider>
              {children}
              <SearchModal />
              <SearchTargetWatcher />
              <InstallPrompt />
            </SearchProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
