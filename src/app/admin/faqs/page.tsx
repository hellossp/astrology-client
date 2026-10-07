"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { FAQItem } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { HelpCircle, Plus, Edit, Trash2 } from "lucide-react";

export default function AdminFAQSCMSPage() {
  const { faqs, addFAQ, updateFAQ, deleteFAQ } = useAppState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "General"
  });

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setForm({ question: "", answer: "", category: "General" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQItem) => {
    setEditingFaq(faq);
    setForm({ question: faq.question, answer: faq.answer, category: faq.category });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq) {
      updateFAQ(editingFaq.id, form);
    } else {
      addFAQ(form);
    }
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
            Support FAQ & Chat Q&A CMS
          </h1>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAdd}>
          Add New Q&A
        </Button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="glass-panel p-5 rounded-2xl border border-amber-500/20 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {faq.category}
              </span>
              <h3 className="font-bold text-slate-100 text-sm">{faq.question}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button variant="secondary" size="sm" icon={<Edit className="w-3.5 h-3.5" />} onClick={() => handleOpenEdit(faq)}>
                Edit
              </Button>
              <button
                onClick={() => deleteFAQ(faq.id)}
                className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl border border-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingFaq ? "Edit FAQ" : "Add FAQ"}>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Category</label>
            <input
              type="text"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Question Prompt</label>
            <input
              type="text"
              required
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Predefined Answer</label>
            <textarea
              rows={4}
              required
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Save Q&A</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
