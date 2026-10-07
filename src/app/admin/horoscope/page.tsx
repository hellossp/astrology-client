"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { ZODIAC_SIGNS, HoroscopePrediction } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Sparkles, Save, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminHoroscopeCMSPage() {
  const { horoscopes, updateHoroscope, showToast } = useAppState();

  const [selectedSignId, setSelectedSignId] = useState<string>("aries");
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");

  const activePrediction =
    horoscopes.find((h) => h.signId === selectedSignId && h.period === period) || {
      signId: selectedSignId,
      period: period,
      title: `Prediction for ${selectedSignId}`,
      general: `Jupiter transit brings positive clarity to your path today.`,
      career: `Career recognitions and new client projects favored.`,
      love: `Harmonious communications and deep mutual bonding.`,
      finance: `Steady cash flow and returns on prior efforts.`,
      health: `High energy levels; keep hydrated.`,
      luckyNumber: 7,
      luckyColor: "Royal Gold",
      date: "Today"
    };

  const [form, setForm] = useState<HoroscopePrediction>(activePrediction);

  const handleSignOrPeriodChange = (signId: string, p: "daily" | "weekly" | "monthly") => {
    setSelectedSignId(signId);
    setPeriod(p);
    const found = horoscopes.find((h) => h.signId === signId && h.period === p);
    if (found) {
      setForm(found);
    } else {
      setForm({
        signId,
        period: p,
        title: `Cosmic prediction for ${signId}`,
        general: `Positive celestial forces align to favor growth.`,
        career: `New professional opportunities arrive mid-day.`,
        love: `Romantic harmony and open affection.`,
        finance: `Stable investment gains indicated.`,
        health: `Balanced diet and physical fitness recommended.`,
        luckyNumber: 5,
        luckyColor: "Saffron Yellow",
        date: "Today"
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHoroscope(form);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Content Management System
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Zodiac Horoscope CMS
        </h1>
        <p className="text-xs text-slate-400">
          Manage Daily, Weekly, and Monthly horoscope predictions published on the public website.
        </p>
      </div>

      {/* Select Sign & Period Control Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-amber-400 uppercase">1. Select Zodiac Sign</label>
          <span className="text-xs text-slate-400">Targeting: <strong className="text-amber-300 capitalize">{selectedSignId} ({period})</strong></span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {ZODIAC_SIGNS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSignOrPeriodChange(s.id, period)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedSignId === s.id
                  ? "gold-gradient-bg text-slate-950 shadow-md font-extrabold"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {s.symbol} {s.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-xs font-bold text-slate-400">Period:</span>
          {(["daily", "weekly", "monthly"] as const).map((p) => (
            <button
              key={p}
              onClick={() => handleSignOrPeriodChange(selectedSignId, p)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                period === p
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Horoscope Form */}
      <form onSubmit={handleSave} className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-4">
        <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
          2. Edit Prediction Content
        </h2>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Headline Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">General Overview Prediction</label>
          <textarea
            rows={3}
            required
            value={form.general}
            onChange={(e) => setForm({ ...form, general: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Career Guidance</label>
            <textarea
              rows={2}
              value={form.career}
              onChange={(e) => setForm({ ...form, career: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Love & Relationship</label>
            <textarea
              rows={2}
              value={form.love}
              onChange={(e) => setForm({ ...form, love: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Finance & Investment</label>
            <textarea
              rows={2}
              value={form.finance}
              onChange={(e) => setForm({ ...form, finance: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Health & Wellbeing</label>
            <textarea
              rows={2}
              value={form.health}
              onChange={(e) => setForm({ ...form, health: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Lucky Number</label>
            <input
              type="number"
              value={form.luckyNumber}
              onChange={(e) => setForm({ ...form, luckyNumber: parseInt(e.target.value) || 7 })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Lucky Colour</label>
            <input
              type="text"
              value={form.luckyColor}
              onChange={(e) => setForm({ ...form, luckyColor: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => showToast("Draft saved internally", "info")}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-slate-100"
          >
            Save Draft
          </button>

          <div className="flex items-center gap-2">
            <Button type="submit" variant="primary" size="md" icon={<Sparkles className="w-4 h-4" />}>
              Publish to Public Website
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
