import { layout, meta } from "@d-exclaimation/next";
import { DM_Mono, DM_Serif_Display, Manrope } from "next/font/google";
import QueryProvider from "./(query)/provider";
import SettingsProvider from "./(settings)/provider";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});
const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});
const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const metadata = meta({
  title: "Pixle",
  description: "Capture the world, one snap at a time",
  openGraph: {
    type: "article",
    images: ["/app/banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@dexclaimation",
    images: ["/app/banner.png"],
  },
  icons: {
    icon: [
      "/favicon.ico",
      { sizes: "16x16", url: "/favicon-16x16.png" },
      { sizes: "32x32", url: "/favicon-32x32.png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  viewport: {
    initialScale: 1,
    width: "device-width",
    viewportFit: "cover",
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030121" },
    { media: "(prefers-color-scheme: light)", color: "#f2faff" },
  ],
});

export default layout(({ children }) => {
  return (
    <html
      lang="en"
      className={`bg-[#f2faff] dark:bg-[#011321] w-full h-full ${sans.variable} ${mono.variable} ${serif.variable} font-sans`}
    >
      <body className="flex flex-col w-full min-h-full items-center justify-start">
        <QueryProvider>
          <SettingsProvider>{children}</SettingsProvider>
        </QueryProvider>
      </body>
    </html>
  );
});
