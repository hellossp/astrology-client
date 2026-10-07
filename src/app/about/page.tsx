"use client";

import React from "react";
import { BRAND_CONFIG } from "@/config/branding";
import { TESTIMONIALS } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Award, ShieldCheck, Sparkles, Star, Calendar, Scroll, CheckCircle2, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-16">
      {/* Profile Hero */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30 bg-stars relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"
                alt={BRAND_CONFIG.astrologerName}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 p-3 border-t border-amber-500/30 text-center">
                <span className="text-xs font-bold text-amber-300">{BRAND_CONFIG.astrologerExperience} Experience</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Vedic Astrology Specialist
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
              Meet <span className="gold-gradient-text">{BRAND_CONFIG.astrologerName}</span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              With over 15+ years of dedicated practice in Parashari Vedic Astrology, Jaimini Sutras, and Vastu Shastra, {BRAND_CONFIG.astrologerName} has provided transformative guidance to over 50,000 individuals, entrepreneurs, and families globally.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="font-extrabold text-amber-300 text-base">50,000+</div>
                <div className="text-slate-400">Consultations Done</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="font-extrabold text-amber-300 text-base">15+ Yrs</div>
                <div className="text-slate-400">Astrological Practice</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs col-span-2 sm:col-span-1">
                <div className="font-extrabold text-amber-300 text-base">4.9 ★</div>
                <div className="text-slate-400">Client Rating</div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Button href="/booking" variant="primary" size="lg" icon={<Calendar className="w-5 h-5" />}>
                Book Consultation
              </Button>
              <Button href="/kundli" variant="outline" size="lg" icon={<Scroll className="w-5 h-5" />}>
                Free Kundli Chart
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Specializations & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/20 space-y-4">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-amber-400" /> Core Specializations
          </h2>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Janam Kundli & Dasha Timeline:</strong> Decoding planetary house lords, Mahadashas, and transit impacts.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Kundli Matchmaking (Ashtakoot 36-Gun):</strong> Nadi, Manglik Dosha, and marital harmony evaluations.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Career & Financial Guidance:</strong> Career switches, promotion timing, and business launching dates.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Non-Demolition Vastu Remedies:</strong> Elemental balancing for homes and commercial spaces.</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/20 space-y-4">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Award className="w-5 h-5 text-amber-400" /> Honors & Achievements
          </h2>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Awarded <strong>Jyotish Ratna</strong> for excellence in Vedic astrology research (2018).</span>
            </li>
            <li className="flex items-start gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Guest Speaker at International Vedic Astrology Conclaves in New Delhi & Dubai.</span>
            </li>
            <li className="flex items-start gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Author of published research papers on Saturn Sade Sati and planetary transits.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-100 text-center">What Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed italic">"{t.review}"</p>
              </div>
              <div className="text-xs font-bold text-amber-300 pt-2 border-t border-slate-800">
                {t.name} • {t.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
