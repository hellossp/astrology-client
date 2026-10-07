"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Testimonial } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MessageSquare, Star, Plus, CheckCircle2, XCircle } from "lucide-react";

export default function AdminTestimonialsPage() {
  const { testimonials, updateTestimonialStatus, addTestimonial } = useAppState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "New Delhi",
    rating: 5,
    review: "",
    service: "Kundli Reading",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTestimonial(form);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Content Management System
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Client Testimonials Manager
          </h1>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
          Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  t.status === "approved"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : t.status === "pending"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}
              >
                {t.status}
              </span>
            </div>

            <p className="text-xs text-slate-200 italic">"{t.review}"</p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="font-bold text-slate-100">{t.name} ({t.location})</span>
              <div className="flex items-center gap-2">
                {t.status !== "approved" && (
                  <Button variant="primary" size="sm" onClick={() => updateTestimonialStatus(t.id, "approved")}>
                    Approve
                  </Button>
                )}
                {t.status !== "rejected" && (
                  <button
                    onClick={() => updateTestimonialStatus(t.id, "rejected")}
                    className="px-2 py-1 rounded-lg text-xs text-red-400 border border-red-500/20"
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Testimonial">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Customer Name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100" />
          </div>
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Review Text</label>
            <textarea rows={3} required value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Save Testimonial</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
