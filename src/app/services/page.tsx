"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatters";
import { Sparkles, Clock, CheckCircle2, ChevronRight, Filter } from "lucide-react";

export default function ServicesPage() {
  const { services } = useAppState();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Vedic Astrology", "Career", "Marriage", "Business", "Vastu", "Numerology"];

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Professional Astrology Services
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
          Consultation <span className="gold-gradient-text">Offerings</span>
        </h1>
        <p className="text-sm text-slate-300">
          Tailored 1-on-1 consultations provided online via video call or offline at our center.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar justify-start md:justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeCategory === cat
                ? "gold-gradient-bg text-slate-950 shadow-md font-extrabold"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between relative group border border-amber-500/20"
          >
            {service.popular && (
              <span className="absolute -top-3 right-6 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Popular
              </span>
            )}

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-semibold text-amber-400/90">{service.category}</span>
                <h2 className="text-xl font-bold text-slate-100 mt-0.5">{service.title}</h2>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {service.fullDescription || service.description}
              </p>

              {/* Benefits checklist */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  {service.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-amber-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> {service.duration}
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  {service.isOnlineAvailable && service.isOfflineAvailable
                    ? "Online & Offline Available"
                    : service.isOnlineAvailable
                    ? "Online Only"
                    : "Offline Center"}
                </span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Fee</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-amber-300">{formatPrice(service.price)}</span>
                  {service.originalPrice && (
                    <span className="text-xs text-slate-500 line-through">{formatPrice(service.originalPrice)}</span>
                  )}
                </div>
              </div>
              <Button href={`/booking?service=${service.id}`} variant="primary" size="md">
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
