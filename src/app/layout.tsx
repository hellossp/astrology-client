import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppStateProvider } from "@/context/AppStateContext";
import { Navbar } from "@/components/layout/Navbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Footer } from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/ToastContainer";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "YOUR WEBSITE NAME — Authentic Vedic Astrology & Free Kundli",
  description: "Discover what the stars say about you. Free Janam Kundli generation, daily horoscope predictions, and direct consultations with YOUR ASTROLOGER NAME.",
  keywords: ["astrology", "vedic astrology", "janam kundli", "free kundli", "daily horoscope", "marriage matching", "astrologer consultation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${cinzel.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-[#030712] text-slate-100 flex flex-col antialiased selection:bg-amber-500 selection:text-slate-950 font-sans">
        <AppStateProvider>
          <Navbar />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
          <MobileBottomNav />
          <ToastContainer />
        </AppStateProvider>
      </body>
    </html>
  );
}
