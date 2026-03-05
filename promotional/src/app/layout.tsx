import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/components/LanguageProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Saros Vadi | Mediterranean Boutique Resort",
  description:
    "Discover the perfect harmony of nature and luxury at Saros Vadi. An unforgettable Mediterranean experience awaits you.",
  openGraph: {
    title: "Saros Vadi | Mediterranean Boutique Resort",
    description: "Discover the perfect harmony of nature and luxury at Saros Vadi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Apply stored theme before paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('hotel101-theme');document.documentElement.setAttribute('data-theme',t||'light');var l=localStorage.getItem('sarosvadi-lang');document.documentElement.lang=l||'tr';}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${raleway.variable} antialiased`}>
        <ThemeProvider><LanguageProvider>{children}</LanguageProvider></ThemeProvider>
      </body>
    </html>
  );
}
