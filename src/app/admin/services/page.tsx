"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { AstrologyService } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Briefcase, Plus, Edit, ToggleLeft, ToggleRight, Sparkles } from "lucide-react";
import { formatPrice } from "@/utils/formatters";

export default function AdminServicesCMSPage() {
  const { services, addService, updateService, toggleServiceStatus } = useAppState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<AstrologyService | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: "Vedic Astrology",
    description: "",
    fullDescription: "",
    duration: "45 Mins",
    price: 1499,
    originalPrice: 2499,
    isOnlineAvailable: true,
    isOfflineAvailable: true,
    popular: false,
    icon: "Scroll",
    benefits: ["Complete House Analysis", "Personalized Remedies"]
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setForm({
      title: "",
      category: "Vedic Astrology",
      description: "",
      fullDescription: "",
      duration: "45 Mins",
      price: 1499,
      originalPrice: 2499,
      isOnlineAvailable: true,
      isOfflineAvailable: true,
      popular: false,
      icon: "Scroll",
      benefits: ["Complete House Analysis", "Personalized Remedies"]
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: AstrologyService) => {
    setEditingService(s);
    setForm({
      title: s.title,
      category: s.category,
      description: s.description,
      fullDescription: s.fullDescription,
      duration: s.duration,
      price: s.price,
      originalPrice: s.originalPrice || s.price + 500,
      isOnlineAvailable: s.isOnlineAvailable,
      isOfflineAvailable: s.isOfflineAvailable,
      popular: s.popular || false,
      icon: s.icon,
      benefits: s.benefits || []
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService.id, form);
    } else {
      addService(form);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Admin Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Astrology Services CMS
          </h1>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAdd}>
          Add New Service
        </Button>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div key={service.id} className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">{service.category}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-100">{formatPrice(service.price)}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-100 text-base">{service.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{service.description}</p>
            </div>

            <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
              <span>Duration: {service.duration}</span>
              <span>
                {service.isOnlineAvailable && service.isOfflineAvailable
                  ? "Online & Offline"
                  : service.isOnlineAvailable
                  ? "Online Only"
                  : "Offline Only"}
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button variant="secondary" size="sm" icon={<Edit className="w-3.5 h-3.5" />} onClick={() => handleOpenEdit(service)}>
                Edit
              </Button>
              <button
                onClick={() => toggleServiceStatus(service.id)}
                className="px-2.5 py-1 text-xs font-bold text-slate-400 hover:text-white bg-slate-900 rounded-xl border border-slate-800"
              >
                Disable
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add/Edit Service */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingService ? "Edit Service" : "Add Service"}>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Service Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Price (₹)</label>
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 999 })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Duration</label>
              <input
                type="text"
                required
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Short Description</label>
            <textarea
              rows={2}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isOnlineAvailable}
                onChange={(e) => setForm({ ...form, isOnlineAvailable: e.target.checked })}
                className="accent-amber-500"
              />
              <span>Online Video Available</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isOfflineAvailable}
                onChange={(e) => setForm({ ...form, isOfflineAvailable: e.target.checked })}
                className="accent-amber-500"
              />
              <span>Offline Center Visit</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Service
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
