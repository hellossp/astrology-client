"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/Button";
import {
  Scroll,
  Sun,
  Calendar,
  Clock,
  MapPin,
  User,
  Download,
  Share2,
  BookmarkPlus,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export default function KundliPage() {
  const { addSavedKundli, showToast } = useAppState();

  const [form, setForm] = useState({
    name: "Dhiren Sharma",
    dob: "1994-08-15",
    timeOfBirth: "08:30",
    placeOfBirth: "New Delhi, India",
    gender: "Male"
  });

  const [isGenerated, setIsGenerated] = useState(true); // Default generated so user immediately sees rich chart!
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsGenerated(true);
      showToast("Vedic Janam Kundli generated successfully!", "success");
    }, 600);
  };

  const handleSaveToDashboard = () => {
    addSavedKundli({
      id: `KND-${Math.floor(100 + Math.random() * 900)}`,
      name: form.name,
      dob: form.dob,
      time: form.timeOfBirth,
      place: form.placeOfBirth,
      rashi: "Leo (Simha)",
      nakshatra: "Magha (Pada 2)",
      lagna: "Virgo (Kanya)",
      generatedAt: new Date().toISOString().split("T")[0]
    });
  };

  const planetaryTable = [
    { planet: "Sun (Surya)", sign: "Leo (Simha)", house: "1st House (Lagna)", degree: "28° 42'", status: "Exalted" },
    { planet: "Moon (Chandra)", sign: "Taurus (Vrishabha)", house: "10th House", degree: "14° 15'", status: "Exalted" },
    { planet: "Mars (Mangal)", sign: "Aries (Mesha)", house: "9th House", degree: "05° 50'", status: "Own Sign" },
    { planet: "Mercury (Budh)", sign: "Virgo (Kanya)", house: "2nd House", degree: "19° 08'", status: "Exalted" },
    { planet: "Jupiter (Guru)", sign: "Sagittarius (Dhanu)", house: "5th House", degree: "11° 33'", status: "Benefic" },
    { planet: "Venus (Shukra)", sign: "Libra (Tula)", house: "3rd House", degree: "22° 40'", status: "Own Sign" },
    { planet: "Saturn (Shani)", sign: "Aquarius (Kumbha)", house: "7th House", degree: "08° 12'", status: "Own Sign" },
    { planet: "Rahu", sign: "Gemini (Mithuna)", house: "11th House", degree: "17° 04'", status: "Shadow" },
    { planet: "Ketu", sign: "Sagittarius (Dhanu)", house: "5th House", degree: "17° 04'", status: "Shadow" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase">
          <Scroll className="w-3.5 h-3.5" /> Free Vedic Janam Kundli
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
          Generate Your <span className="gold-gradient-text">Birth Chart</span>
        </h1>
        <p className="text-sm text-slate-300">
          Calculate precise planetary positions, Lagna chart, Nakshatra, and Dasha periods based on ancient Parashari principles.
        </p>
      </div>

      {/* Input Form Card */}
      <div className="max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl">
        <form onSubmit={handleGenerate} className="space-y-4">
          <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Enter Birth Details</span>
            <span className="text-xs text-amber-400 font-normal">100% Free & Accurate</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Gender (Optional)</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Birth</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  required
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="w-full pl-9 pr-2 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Time of Birth</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="time"
                  required
                  value={form.timeOfBirth}
                  onChange={(e) => setForm({ ...form, timeOfBirth: e.target.value })}
                  className="w-full pl-9 pr-2 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Place of Birth</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={form.placeOfBirth}
                  onChange={(e) => setForm({ ...form, placeOfBirth: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          <Button type="submit" variant="primary" fullWidth size="lg" disabled={loading} icon={<Sparkles className="w-5 h-5" />}>
            {loading ? "Calculating Planetary Degrees..." : "Generate My Kundli"}
          </Button>
        </form>
      </div>

      {/* KUNDLI RESULT REPORT SECTION */}
      {isGenerated && (
        <div className="space-y-8 animate-fadeIn">
          {/* Action Bar */}
          <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block">Janam Kundli Report</span>
              <h3 className="text-lg font-bold text-slate-100">{form.name}'s Horoscope Report</h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                icon={<BookmarkPlus className="w-4 h-4" />}
                onClick={handleSaveToDashboard}
              >
                Save to Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<Share2 className="w-4 h-4" />}
                onClick={() => showToast("Kundli link copied to clipboard!", "info")}
              >
                Share Report
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<Download className="w-4 h-4" />}
                onClick={() => showToast("Downloading Kundli PDF Report...", "success")}
              >
                Download PDF
              </Button>
            </div>
          </div>

          {/* Core Astro Pillars (Rashi, Nakshatra, Lagna) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-1">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Lagna (Ascendant)</span>
              <div className="text-xl font-extrabold text-slate-100">Virgo (Kanya)</div>
              <p className="text-[11px] text-slate-400">Governed by Mercury • Analytical & Meticulous</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-1">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Rashi (Moon Sign)</span>
              <div className="text-xl font-extrabold text-slate-100">Leo (Simha)</div>
              <p className="text-[11px] text-slate-400">Governed by Sun • Majestic & Ambitious</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-1">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Nakshatra</span>
              <div className="text-xl font-extrabold text-slate-100">Magha (Pada 2)</div>
              <p className="text-[11px] text-slate-400">Ruler: Ketu • Royal & Ancestral Honor</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-1">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Current Dasha</span>
              <div className="text-xl font-extrabold text-slate-100">Jupiter-Venus</div>
              <p className="text-[11px] text-slate-400">Active until March 2028 • Favorable Period</p>
            </div>
          </div>

          {/* Kundli Chart Visual & Birth Particulars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* North Indian Kundli Chart Visual */}
            <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-amber-500/30 flex flex-col items-center justify-center">
              <h3 className="text-base font-bold text-amber-300 mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-400" />
                Lagna Kundli Chart (North Indian Style)
              </h3>

              {/* Realistic Diamond Pattern Kundli SVG */}
              <div className="w-full max-w-md aspect-square bg-slate-950 border-2 border-amber-500/50 rounded-2xl p-4 relative shadow-2xl flex items-center justify-center">
                <svg viewBox="0 0 400 400" className="w-full h-full text-amber-400 stroke-current">
                  {/* Outer Frame */}
                  <rect x="10" y="10" width="380" height="380" fill="none" strokeWidth="2" />
                  {/* Main Diagonals */}
                  <line x1="10" y1="10" x2="390" y2="390" strokeWidth="1.5" />
                  <line x1="390" y1="10" x2="10" y2="390" strokeWidth="1.5" />
                  {/* Diamond Box */}
                  <polygon points="200,10 390,200 200,390 10,200" fill="none" strokeWidth="1.5" />

                  {/* House Numbers & Planetary Text Labels */}
                  {/* 1st House (Top Center Diamond) */}
                  <text x="200" y="100" fill="#f3d884" fontSize="14" fontWeight="bold" textAnchor="middle">1 (Virgo)</text>
                  <text x="200" y="125" fill="#ffffff" fontSize="11" textAnchor="middle">Asc / Budh</text>

                  {/* 2nd House */}
                  <text x="110" y="55" fill="#f3d884" fontSize="12" textAnchor="middle">2</text>
                  <text x="110" y="75" fill="#9ca3af" fontSize="10" textAnchor="middle">Surya</text>

                  {/* 3rd House */}
                  <text x="55" y="110" fill="#f3d884" fontSize="12" textAnchor="middle">3</text>
                  <text x="55" y="130" fill="#9ca3af" fontSize="10" textAnchor="middle">Shukra</text>

                  {/* 4th House (Left Diamond) */}
                  <text x="100" y="200" fill="#f3d884" fontSize="14" fontWeight="bold" textAnchor="middle">4</text>
                  <text x="100" y="220" fill="#ffffff" fontSize="11" textAnchor="middle">Chandra</text>

                  {/* 5th House */}
                  <text x="55" y="290" fill="#f3d884" fontSize="12" textAnchor="middle">5</text>
                  <text x="55" y="310" fill="#9ca3af" fontSize="10" textAnchor="middle">Guru / Ketu</text>

                  {/* 6th House */}
                  <text x="110" y="345" fill="#f3d884" fontSize="12" textAnchor="middle">6</text>

                  {/* 7th House (Bottom Center Diamond) */}
                  <text x="200" y="300" fill="#f3d884" fontSize="14" fontWeight="bold" textAnchor="middle">7</text>
                  <text x="200" y="320" fill="#ffffff" fontSize="11" textAnchor="middle">Shani</text>

                  {/* 8th House */}
                  <text x="290" y="345" fill="#f3d884" fontSize="12" textAnchor="middle">8</text>

                  {/* 9th House */}
                  <text x="345" y="290" fill="#f3d884" fontSize="12" textAnchor="middle">9</text>
                  <text x="345" y="310" fill="#9ca3af" fontSize="10" textAnchor="middle">Mangal</text>

                  {/* 10th House (Right Diamond) */}
                  <text x="300" y="200" fill="#f3d884" fontSize="14" fontWeight="bold" textAnchor="middle">10</text>
                  <text x="300" y="220" fill="#ffffff" fontSize="11" textAnchor="middle">Rahu</text>

                  {/* 11th House */}
                  <text x="345" y="110" fill="#f3d884" fontSize="12" textAnchor="middle">11</text>

                  {/* 12th House */}
                  <text x="290" y="55" fill="#f3d884" fontSize="12" textAnchor="middle">12</text>
                </svg>
              </div>
            </div>

            {/* Birth Information Summary */}
            <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-amber-500/30 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3 mb-4">
                  Birth Information Particulars
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-400">Full Name</span>
                    <span className="font-bold text-slate-100">{form.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-400">Date of Birth</span>
                    <span className="font-bold text-slate-100">{form.dob}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-400">Time of Birth</span>
                    <span className="font-bold text-slate-100">{form.timeOfBirth}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-400">Place of Birth</span>
                    <span className="font-bold text-slate-100">{form.placeOfBirth}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-400">Ayanamsa</span>
                    <span className="font-bold text-amber-300">Lahiri (23° 46' 12")</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-400">Sunrise at Birth</span>
                    <span className="font-bold text-slate-100">05:48 AM</span>
                  </div>
                </div>
              </div>

              {/* Consultation Upsell */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl space-y-2">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Need Deep Analysis by an Expert?</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Book a 1-on-1 consultation with our senior astrologer for personalized remedies, marriage matching, and career timelines.
                </p>
                <Button href="/booking?service=kundli-reading" variant="primary" size="sm" fullWidth className="mt-2">
                  Book Kundli Consultation →
                </Button>
              </div>
            </div>
          </div>

          {/* Planetary Positions Table */}
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center justify-between">
              <span>Planetary Positions (Graha Sthiti)</span>
              <span className="text-xs text-slate-400 font-normal">Nirayana Vedic System</span>
            </h3>

            {/* Mobile Responsive Cards / Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Planet (Graha)</th>
                    <th className="py-3 px-4">Sign (Rashi)</th>
                    <th className="py-3 px-4">House (Bhava)</th>
                    <th className="py-3 px-4">Degree</th>
                    <th className="py-3 px-4 text-right">Dignity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {planetaryTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-100">{row.planet}</td>
                      <td className="py-3 px-4 text-amber-300 font-medium">{row.sign}</td>
                      <td className="py-3 px-4 text-slate-300">{row.house}</td>
                      <td className="py-3 px-4 font-mono text-slate-400">{row.degree}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
