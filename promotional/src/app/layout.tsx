import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway } from "next/font/google";
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
  title: "Hotel 101 | Luxury Hotel Experience",
  description:
    "Discover the perfect harmony of history and luxury at Hotel 101. An unforgettable accommodation experience awaits you.",
  openGraph: {
    title: "Hotel 101 | Luxury Hotel Experience",
    description: "Discover the perfect harmony of history and luxury at Hotel 101.",
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
      <body className={`${cormorant.variable} ${raleway.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
