import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventPlanner",
  description: "Plan and manage your events with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 font-[family-name:var(--font-inter)]">
        <ThemeProvider>
          <div className="mx-auto flex min-h-screen w-[95%] flex-col md:w-[85%] lg:w-[70%]">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
