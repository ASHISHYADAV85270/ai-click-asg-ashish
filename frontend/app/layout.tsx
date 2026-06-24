import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Brand Mentions Dashboard",
    template: "%s | Brand Mentions Dashboard",
  },
  description:
    "Track brand mentions, sentiment, citations, and AI visibility across models.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}