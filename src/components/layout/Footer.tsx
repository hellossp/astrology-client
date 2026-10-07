"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_CONFIG } from "@/config/branding";
import { Sparkles, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide footer on admin routes
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-slate-950 border-t border-amber-500/20 text-slate-300 pt-12 pb-24 md:pb-12 bg-stars relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gold-gradient-bg p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs tracking-wider text-amber-400 font-bold uppercase">
                  {BRAND_CONFIG.logoText}
                </span>
                <span className="text-base font-extrabold text-slate-100">
                  {BRAND_CONFIG.websiteName}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Authentic Vedic Astrology, Free Kundli Analysis, and Personalized Horoscope consultations led by {BRAND_CONFIG.astrologerName}.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span>100% Confidential & Secure Guidance</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-100 tracking-wider uppercase border-b border-amber-500/20 pb-2">
              Astrology Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/kundli" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" /> Free Kundli Generation
                </Link>
              </li>
              <li>
                <Link href="/horoscope" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" /> Daily & Monthly Horoscopes
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" /> Career & Business Consultation
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" /> Kundli Matching for Marriage
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" /> Astrology Shop (Coming Soon)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-100 tracking-wider uppercase border-b border-amber-500/20 pb-2">
              Contact & Center
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{BRAND_CONFIG.contactPhone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{BRAND_CONFIG.contactEmail}</span>
              </li>
            </ul>
          </div>

          {/* Portal Switcher & Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-100 tracking-wider uppercase border-b border-amber-500/20 pb-2">
              Platform Links
            </h4>
            <div className="space-y-2 text-xs">
              <Link
                href="/admin"
                className="block p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all font-semibold text-center"
              >
                Access Admin Dashboard →
              </Link>
              <Link
                href="/chat"
                className="block p-3 rounded-xl bg-purple-900/30 border border-purple-500/30 text-purple-200 hover:bg-purple-800/40 transition-all font-medium text-center"
              >
                Predefined Support & FAQ Chat
              </Link>
            </div>
            <p className="text-[11px] text-slate-400 italic leading-snug">
              Disclaimer: Astrology predictions are based on ancient calculations. Results may vary individually.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 {BRAND_CONFIG.websiteName}. All Rights Reserved. Production UI Prototype.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-amber-300">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-amber-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
