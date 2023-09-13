import { layout, meta } from "@d-exclaimation/next";
import { DM_Mono, DM_Sans, DM_Serif_Display } from "next/font/google";
import Provider from "./(query)/provider";
import "./globals.css";

const sans = DM_Sans({
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
  themeColor: "#171717",
});

export default layout(({ children }) => {
  return (
    <html
      lang="en"
      className={`bg-neutral-900 w-full h-full ${sans.variable} ${mono.variable} ${serif.variable} font-sans`}
      style={{
        backgroundColor: "#171717",
      }}
    >
      <body className="flex flex-col w-full min-h-full items-center justify-start">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
});
