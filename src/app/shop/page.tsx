"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatters";
import { ShoppingBag, Sparkles, Bell, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ShopPage() {
  const { shopProducts, showToast } = useAppState();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast("You've been added to our launch VIP notification list!", "success");
  };

  const categoriesPreview = [
    { title: "Natural Gemstones", desc: "Certified Pukhraj, Neelam, Manik & Moti tuned to planetary houses." },
    { title: "Nepal Rudraksha", desc: "Authentic 1 to 14 Mukhi Rudrakshas energized with Vedic Suktas." },
    { title: "Energized Yantras", desc: "Heavy copper Sri Yantra, Kuber Yantra & Rahu Shields." },
    { title: "Spiritual Accessories", desc: "Sandalwood malas, silver rings, & protective threads." },
    { title: "Puja Samagri Kits", desc: "Complete organic puja essential kits for Mahamrityunjaya & Havan." },
    { title: "Vedic Astrology Books", desc: "Authentic reference books on Parashari principles & house remedies." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-16">
      {/* Coming Soon Hero Banner */}
      <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-amber-500/40 bg-stars text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl gold-gradient-bg p-0.5 mx-auto shadow-xl">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Grand Opening Soon
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
            Astrology Shop — <span className="gold-gradient-text">Coming Soon</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            We're preparing a collection of carefully selected astrology and spiritual products based on your needs. Our shop will be launching soon.
          </p>
        </div>

        {/* Notify Form */}
        <div className="max-w-md mx-auto pt-2">
          {subscribed ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-xs text-emerald-300 flex items-center justify-center gap-2 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Thank you! We will notify you first when the shop launches.</span>
            </div>
          ) : (
            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
              <Button type="submit" variant="primary" size="md" icon={<Bell className="w-4 h-4" />}>
                Notify Me
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Planned Categories Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-100">Upcoming Product Collections</h2>
          <p className="text-xs text-slate-400">Preview what our spiritual store will feature</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesPreview.map((cat, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-amber-500/20 space-y-2 relative">
              <span className="absolute top-4 right-4 text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Coming Soon
              </span>
              <h3 className="font-bold text-slate-100 text-base">{cat.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Mock Cards */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-100 text-center">Featured Product Preview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shopProducts.map((p) => (
            <div key={p.id} className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col justify-between opacity-90">
              <div className="space-y-3">
                <div className="h-44 rounded-2xl overflow-hidden relative bg-slate-900">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">
                    {p.status}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-amber-400">{p.category}</span>
                <h3 className="font-bold text-slate-100 text-sm">{p.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-base font-extrabold text-amber-300">{formatPrice(p.estimatedPrice)}</span>
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
