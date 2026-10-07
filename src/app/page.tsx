"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/config/branding";
import { ZODIAC_SIGNS, ASTROLOGY_SERVICES, BLOG_POSTS, TESTIMONIALS, MOCK_SHOP_PRODUCTS } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { CelestialSphere } from "@/components/ui/CelestialSphere";
import { formatPrice } from "@/utils/formatters";
import {
  Sparkles,
  Scroll,
  Calendar,
  ShieldCheck,
  Award,
  Users,
  Clock,
  ArrowRight,
  Star,
  ShoppingBag,
  CheckCircle2,
  ChevronRight,
  Sun
} from "lucide-react";

export default function HomePage() {
  const [selectedSign, setSelectedSign] = useState(ZODIAC_SIGNS[0]);

  return (
    <div className="flex flex-col w-full space-y-16 md:space-y-24 pb-12 bg-cosmic">
      {/* HERO SECTION - Exact Reference Cosmic Landscape & High Contrast Readability */}
      <section className="relative overflow-hidden pt-10 md:pt-20 pb-16 md:pb-28 bg-[#030712] min-h-[88vh] flex items-center">
        {/* Background Cosmic Wave Nebulae (Matching user screenshot) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            backgroundImage: "radial-gradient(ellipse 80% 50% at 20% 70%, rgba(30, 58, 138, 0.45), transparent 70%), radial-gradient(ellipse 60% 40% at 80% 40%, rgba(17, 24, 39, 0.8), transparent 80%)"
          }}
        />
        <div className="absolute top-1/4 -left-20 w-[600px] h-[350px] bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-transparent blur-3xl pointer-events-none rounded-full transform -rotate-12" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[400px] bg-gradient-to-l from-indigo-950/40 via-blue-950/25 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Top Category Label */}
              <div className="text-slate-400 text-sm font-medium tracking-wide">
                Authentic Vedic Astrology & Cosmic Guidance
              </div>

              {/* Main Headline - Serif Title matching reference image */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-title text-white tracking-tight leading-[1.12]">
                Unlock Your <br />
                <span className="text-white font-normal">Cosmic Blueprint</span>
              </h1>

              {/* Birth Chart Pill Badge */}
              <div className="flex justify-center lg:justify-start pt-1">
                <Link 
                  href="/kundli"
                  className="px-4 py-1.5 rounded-md border border-slate-700 bg-slate-900/60 text-slate-200 text-xs font-medium hover:border-amber-400/60 transition-colors"
                >
                  Birth Chart
                </Link>
              </div>

              {/* Subtitle Lines */}
              <div className="space-y-1 text-slate-300 text-sm sm:text-base font-normal max-w-xl mx-auto lg:mx-0">
                <p>Precision Planetary Readings & Ancient Vedic Calculations</p>
                <p className="text-slate-400">Explore Interactive Birth Charts, Dasha Periods and Zodiac Reports</p>
              </div>

              {/* Primary CTA Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/kundli"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3d884] to-[#c5a059] text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all text-center"
                >
                  Get Your Free Reading
                </Link>
                <Link
                  href="/booking"
                  className="w-full sm:w-auto px-7 py-3 rounded-lg border border-slate-700 text-slate-200 text-sm font-medium hover:border-amber-400 hover:text-amber-300 transition-colors text-center"
                >
                  Book Consultation
                </Link>
              </div>

              {/* Trust Metrics Bar */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold gold-gradient-text font-serif-title">15+ Yrs</div>
                  <div className="text-xs font-medium text-slate-400">Vedic Mastery</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold gold-gradient-text font-serif-title">50,000+</div>
                  <div className="text-xs font-medium text-slate-400">Satisfied Clients</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold gold-gradient-text font-serif-title">4.9 ★</div>
                  <div className="text-xs font-medium text-slate-400">Client Rating</div>
                </div>
              </div>
            </div>

            {/* Right Graphic Column: 3D Armillary Celestial Constellation Sphere */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <CelestialSphere />
            </div>
          </div>
        </div>
      </section>

      {/* ASTROLOGY SERVICES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Personalized Consultations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-white">
            Our Premium Astrology Services
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Choose from specialized consultations tailored to solve life's most important decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ASTROLOGY_SERVICES.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between relative group"
            >
              {service.popular && (
                <span className="absolute -top-3 right-6 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular
                </span>
              )}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-amber-400">{service.category}</span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{service.title}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> {service.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Online & Offline
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Consultation Fee</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold text-amber-300">{formatPrice(service.price)}</span>
                    {service.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">{formatPrice(service.originalPrice)}</span>
                    )}
                  </div>
                </div>
                <Button href={`/booking?service=${service.id}`} variant="primary" size="sm">
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button href="/services" variant="outline" icon={<ChevronRight className="w-4 h-4" />}>
            View All Services
          </Button>
        </div>
      </section>

      {/* FREE KUNDLI BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30 relative overflow-hidden bg-gradient-to-r from-purple-950/80 via-slate-900 to-amber-950/60 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase">
                <Scroll className="w-3.5 h-3.5" /> Instant & Free Report
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif-title text-white">
                Generate Your Free Vedic Birth Chart (Janam Kundli)
              </h2>
              <p className="text-sm text-slate-200 max-w-2xl leading-relaxed">
                Enter your exact birth date, time, and place to calculate your Lagna chart, Moon sign (Rashi), Nakshatra, planetary positions, and Dasha breakdown instantly.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Button href="/kundli" variant="primary" size="lg" icon={<Scroll className="w-5 h-5" />}>
                  Generate Kundli Now
                </Button>
                <span className="text-xs text-slate-300 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Free • Instant Calculation
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-slate-950 border-2 border-amber-500/40 p-4 flex flex-col justify-center items-center text-center shadow-xl">
                <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center text-slate-950 font-bold mb-2">
                  <Sun className="w-6 h-6" />
                </div>
                <div className="text-xs font-extrabold text-amber-300">Vedic Chart</div>
                <div className="text-[11px] text-slate-300 mt-1">Lagna • Rashi • Dasha</div>
                <span className="mt-3 px-3 py-1 bg-amber-500/10 text-amber-300 rounded-lg text-xs font-bold border border-amber-500/30">
                  Free Report View
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAILY HOROSCOPE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-3 mb-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span>Daily</span>
            <span className="gold-gradient-text font-black px-1.5 py-0.5 rounded bg-amber-400/20 border border-amber-400/50 shadow-[0_0_10px_rgba(243,216,132,0.4)]">
              INSIGHT
            </span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif-title text-white">
            Select Your Zodiac Sign
          </h2>
          <p className="text-sm text-slate-300">
            Read today's planetary alignment and lucky predictions for your sign.
          </p>
        </div>

        {/* Zodiac Selector Horizontal Chips */}
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
          {ZODIAC_SIGNS.map((sign) => {
            const isSelected = selectedSign.id === sign.id;
            return (
              <button
                key={sign.id}
                onClick={() => setSelectedSign(sign)}
                className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10 scale-105"
                    : "bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span className="text-base">{sign.symbol}</span>
                <span>{sign.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Sign Horoscope Preview Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 mt-4 border border-amber-500/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gold-gradient-bg p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl">
                  {selectedSign.symbol}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{selectedSign.name}</h3>
                  <span className="text-xs text-amber-300 font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    {selectedSign.sanskritName}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {selectedSign.dates} • Element: {selectedSign.element} • Ruler: {selectedSign.rulingPlanet}
                </p>
              </div>
            </div>

            <Button href={`/horoscope?sign=${selectedSign.id}`} variant="outline" size="sm">
              Read Full Horoscope →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-amber-400 uppercase">Career & Work</div>
              <p className="text-xs text-slate-200 mt-1.5 leading-relaxed">
                Strong focus on mid-day tasks. Professional efforts get appreciated by peers and superiors.
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-pink-400 uppercase">Love & Relationship</div>
              <p className="text-xs text-slate-200 mt-1.5 leading-relaxed">
                Harmony prevails in communications. Warm evening hours favor quality personal bonding.
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-emerald-400 uppercase">Finance</div>
              <p className="text-xs text-slate-200 mt-1.5 leading-relaxed">
                Steady money flow indicated. Wise day to review upcoming planned investments.
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-purple-400 uppercase">Cosmic Indicators</div>
                <div className="mt-2 text-xs space-y-1">
                  <div className="text-slate-300">Lucky Number: <span className="font-bold text-amber-300">7</span></div>
                  <div className="text-slate-300">Lucky Color: <span className="font-bold text-amber-300">Royal Gold</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Trusted Astrology Center
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-white">
            Why Choose {BRAND_CONFIG.websiteName}?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            We combine ancient Parashari Vedic wisdom with confidential, practical guidance for modern life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl gold-gradient-bg p-0.5 mx-auto">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
                <Award className="w-6 h-6" />
              </div>
            </div>
            <h3 className="font-bold text-white text-base">15+ Years Mastery</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Guided by {BRAND_CONFIG.astrologerName} with deep mastery in Parashari, Jaimini & Vastu principles.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl gold-gradient-bg p-0.5 mx-auto">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
            <h3 className="font-bold text-white text-base">100% Confidential</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your personal birth details and audio/video consultations are kept strictly private and secure.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl gold-gradient-bg p-0.5 mx-auto">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
            <h3 className="font-bold text-white text-base">Practical Remedies</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Simple Vedic remedies, mantra chants, gemstone guidance, and lifestyle adjustments that work.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl gold-gradient-bg p-0.5 mx-auto">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <h3 className="font-bold text-white text-base">Global Client Base</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Trusted by 50,000+ individuals across India, USA, UK, UAE, and Canada for accurate predictions.
            </p>
          </div>
        </div>
      </section>

      {/* LATEST BLOG POSTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Vedic Wisdom Articles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-white mt-1">
              Latest Astrology Articles
            </h2>
          </div>
          <Button href="/blog" variant="outline" size="sm">
            Read All Articles →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="h-44 w-full relative overflow-hidden bg-slate-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <span className="absolute top-3 left-3 bg-slate-950/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
                  {post.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-[11px] text-slate-300 flex flex-wrap items-center gap-1.5">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span className="text-amber-300 font-semibold">By {post.author || BRAND_CONFIG.astrologerName}</span>
                  </div>
                  <h3 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1 pt-2">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-white">
            What Our Clients Say
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Real stories from individuals whose lives changed after consulting {BRAND_CONFIG.astrologerName}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-300">
                    {t.location} • <span className="text-amber-300 font-semibold">{t.service}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP COMING SOON BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30 bg-gradient-to-br from-slate-900 via-purple-950/50 to-slate-950 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase">
                <ShoppingBag className="w-3.5 h-3.5" /> Coming Soon
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-white">
                Astrology & Spiritual Product Shop
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed">
                We are curating lab-certified natural Gemstones, authentic Rudraksha malas, energized copper Yantras, and Vedic puja essentials tailored to your birth chart.
              </p>
              <div className="pt-2">
                <Button href="/shop" variant="primary" icon={<ShoppingBag className="w-4 h-4" />}>
                  Explore Shop Teaser & Get Notified
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {MOCK_SHOP_PRODUCTS.slice(0, 2).map((p) => (
                <div key={p.id} className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 flex flex-col">
                  <div className="h-28 rounded-xl overflow-hidden mb-2 relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover opacity-85" />
                    <span className="absolute top-2 right-2 bg-amber-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded">
                      Soon
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-100 line-clamp-1">{p.name}</span>
                  <span className="text-xs font-extrabold text-amber-300 mt-1">₹{p.estimatedPrice}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-amber-500/30 bg-stars space-y-6">
          <div className="w-16 h-16 rounded-2xl gold-gradient-bg p-0.5 mx-auto shadow-xl">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
              <Sun className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-title text-white max-w-2xl mx-auto">
            Ready to Unlock Your Cosmic Potential?
          </h2>
          <p className="text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
            Get instant clarity on career, relationships, marriage, and financial growth with authentic Vedic astrology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button href="/booking" variant="primary" size="lg" icon={<Calendar className="w-5 h-5" />}>
              Book Your Consultation
            </Button>
            <Button href="/kundli" variant="outline" size="lg" icon={<Scroll className="w-5 h-5" />}>
              Generate Free Kundli
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
