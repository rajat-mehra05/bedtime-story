import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

// Classy serif font for headings
const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Elegant serif font for body text
const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bedtime Stories - Magical Tales for Kids",
  description: "Create personalized bedtime stories for children with beautiful illustrations. AI-powered stories in English, Hindi, and Assamese with PDF export.",
  keywords: "bedtime stories, children stories, AI stories, kids tales, personalized stories",
  authors: [{ name: "Bedtime Stories" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${lora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
