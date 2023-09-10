import { layout, meta } from "@d-exclaimation/next";
import { DM_Mono, DM_Sans, DM_Serif_Display } from "next/font/google";
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
  appleWebApp: {
    statusBarStyle: "black-translucent",
    capable: true,
  },
});

export default layout(({ children }) => {
  return (
    <html
      lang="en"
      className={`bg-neutral-900 h-full ${sans.variable} ${mono.variable} ${serif.variable} font-sans`}
      style={{
        backgroundColor: "#171717",
      }}
    >
      <body className="flex flex-col w-screen min-h-[100dvh] items-center justify-start antialiased">
        <div className="flex flex-col w-screen min-h-[100dvh] items-center justify-start">
          {children}
        </div>
      </body>
    </html>
  );
});
