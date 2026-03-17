import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Danendra – Full Stack Developer Portfolio",
  description:
    "Portofolio Danendra, Full Stack Developer yang berspesialisasi dalam membangun aplikasi web modern yang cepat, elegans, dan scalable.",
  keywords: ["portfolio", "developer", "full stack", "next.js", "react"],
  authors: [{ name: "Danendra" }],
  openGraph: {
    title: "Danendra – Full Stack Developer",
    description: "Membangun pengalaman digital yang luar biasa.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="antialiased min-h-screen bg-white text-[#0F172A] transition-colors duration-300 dark:bg-[#0F172A] dark:text-slate-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
