"use client";

import React, { useState } from "react";
import { BRAND_CONFIG } from "@/config/branding";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Settings, Save, ShieldCheck, Sparkles } from "lucide-react";

export default function AdminSettingsPage() {
  const { showToast } = useAppState();

  const [form, setForm] = useState({
    logoText: BRAND_CONFIG.logoText,
    websiteName: BRAND_CONFIG.websiteName,
    astrologerName: BRAND_CONFIG.astrologerName,
    contactEmail: BRAND_CONFIG.contactEmail,
    contactPhone: BRAND_CONFIG.contactPhone,
    whatsappNumber: BRAND_CONFIG.whatsappNumber
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Platform branding settings saved!", "success");
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-2xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Admin Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Platform & Branding Settings
        </h1>
        <p className="text-xs text-slate-400">
          Replace placeholder branding strings across headers, footers, meta tags, and hero banners.
        </p>
      </div>

      <form onSubmit={handleSave} className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-300 mb-1">Logo Text Placeholder</label>
          <input
            type="text"
            required
            value={form.logoText}
            onChange={(e) => setForm({ ...form, logoText: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-bold"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Website Name Placeholder</label>
          <input
            type="text"
            required
            value={form.websiteName}
            onChange={(e) => setForm({ ...form, websiteName: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-bold"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Astrologer Name Placeholder</label>
          <input
            type="text"
            required
            value={form.astrologerName}
            onChange={(e) => setForm({ ...form, astrologerName: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-bold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Contact Email</label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">WhatsApp Desk Number</label>
            <input
              type="text"
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
          Save Branding Configuration
        </Button>
      </form>
    </div>
  );
}
