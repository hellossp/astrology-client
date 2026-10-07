"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ZODIAC_SIGNS, MOCK_HOROSCOPES } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Briefcase,
  Heart,
  DollarSign,
  Activity,
  Share2,
  Bookmark
} from "lucide-react";
import { useAppState } from "@/context/AppStateContext";

function HoroscopeContent() {
  const { horoscopes, showToast } = useAppState();
  const searchParams = useSearchParams();
  const initialSignId = searchParams.get("sign") || "aries";

  const [selectedSignId, setSelectedSignId] = useState<string>(initialSignId);
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");

  const selectedSign = ZODIAC_SIGNS.find((s) => s.id === selectedSignId) || ZODIAC_SIGNS[0];

  const currentPrediction =
    horoscopes.find((h) => h.signId === selectedSign.id && h.period === period) ||
    MOCK_HOROSCOPES.find((h) => h.signId === selectedSign.id && h.period === period) ||
    MOCK_HOROSCOPES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Cosmic Predictions
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
          Daily Zodiac <span className="gold-gradient-text px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/40 shadow-[0_0_15px_rgba(243,216,132,0.3)]">INSIGHTS</span>
        </h1>
        <p className="text-sm text-slate-300">
          Daily, Weekly, and Monthly Vedic astrological guidance for all 12 zodiac signs.
        </p>
      </div>

      {/* Period Toggle Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-900 p-1.5 rounded-2xl border border-amber-500/20 inline-flex items-center gap-1 shadow-lg">
          {(["daily", "weekly", "monthly"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                period === p
                  ? "gold-gradient-bg text-slate-950 shadow-md font-extrabold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {p} Horoscope
            </button>
          ))}
        </div>
      </div>

      {/* Zodiac Signs Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {ZODIAC_SIGNS.map((sign) => {
          const isSelected = selectedSign.id === sign.id;
          return (
            <button
              key={sign.id}
              onClick={() => setSelectedSignId(sign.id)}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center space-y-2 cursor-pointer ${
                isSelected
                  ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-xl shadow-amber-500/10 scale-105"
                  : "glass-panel border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <span className="text-2xl">{sign.symbol}</span>
              <div>
                <div className="text-xs font-bold">{sign.name}</div>
                <div className="text-[10px] text-slate-400 truncate max-w-[90px]">{sign.dates}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* HOROSCOPE PREDICTION DETAIL CARD */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30 space-y-8 animate-fadeIn">
        {/* Banner Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gold-gradient-bg p-0.5 shadow-xl">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-3xl">
                {selectedSign.symbol}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-slate-100">{selectedSign.name}</h2>
                <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                  {selectedSign.sanskritName}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {selectedSign.dates} • Element: {selectedSign.element} • Ruling Planet: {selectedSign.rulingPlanet}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={<Bookmark className="w-4 h-4" />}
              onClick={() => showToast("Horoscope saved to dashboard!", "success")}
            >
              Save Horoscope
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Share2 className="w-4 h-4" />}
              onClick={() => showToast("Horoscope prediction link copied!", "info")}
            >
              Share
            </Button>
          </div>
        </div>

        {/* General Overview */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
            {period} Overview
          </h3>
          <p className="text-sm text-slate-200 leading-relaxed">
            {currentPrediction.general}
          </p>
        </div>

        {/* 4 Pillars Grid (Career, Love, Finance, Health) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Career */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Briefcase className="w-4 h-4" /> Career & Profession
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentPrediction.career}
            </p>
          </div>

          {/* Love */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-pink-400 font-bold text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4" /> Love & Relationship
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentPrediction.love}
            </p>
          </div>

          {/* Finance */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <DollarSign className="w-4 h-4" /> Finance & Wealth
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentPrediction.finance}
            </p>
          </div>

          {/* Health */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
              <Activity className="w-4 h-4" /> Health & Wellbeing
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentPrediction.health}
            </p>
          </div>
        </div>

        {/* Lucky Indicators Bar */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex flex-wrap items-center justify-around gap-4 text-center">
          <div>
            <span className="text-xs text-slate-400 block">Lucky Number</span>
            <span className="text-xl font-extrabold text-amber-300">{currentPrediction.luckyNumber}</span>
          </div>
          <div className="w-px h-8 bg-amber-500/20 hidden sm:block" />
          <div>
            <span className="text-xs text-slate-400 block">Lucky Colour</span>
            <span className="text-base font-extrabold text-amber-300">{currentPrediction.luckyColor}</span>
          </div>
          <div className="w-px h-8 bg-amber-500/20 hidden sm:block" />
          <div>
            <span className="text-xs text-slate-400 block">Ruling Planet</span>
            <span className="text-base font-extrabold text-amber-300">{selectedSign.rulingPlanet}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HoroscopePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-amber-400 text-xs font-bold">Loading horoscope...</div>}>
      <HoroscopeContent />
    </Suspense>
  );
}
