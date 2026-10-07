"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { CreditCard, Search, TrendingUp, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/utils/formatters";

export default function AdminPaymentsPage() {
  const { payments } = useAppState();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPayments = payments.filter((p) =>
    p.paymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCollected = payments.reduce((acc, p) => (p.status === "Paid" ? acc + p.amount : acc), 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Admin Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Payment Transactions Ledger
          </h1>
        </div>

        <div className="glass-panel px-4 py-2 rounded-2xl border border-amber-500/30 flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Total Revenue</span>
            <span className="text-lg font-extrabold text-amber-300">{formatPrice(totalCollected)}</span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-72">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Search Payment ID or Customer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Payments List Mobile Cards / Table */}
      <div className="space-y-3">
        {filteredPayments.map((p) => (
          <div key={p.id} className="glass-panel p-4 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-amber-400">{p.paymentId}</span>
                <span className="text-slate-400">• Appointment {p.appointmentId}</span>
              </div>
              <div className="font-bold text-slate-100 text-sm mt-0.5">{p.customerName}</div>
              <div className="text-slate-400 text-[11px]">{p.serviceTitle} • {p.method} • {p.date}</div>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <span className="text-base font-extrabold text-slate-100">{formatPrice(p.amount)}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  p.status === "Paid"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : p.status === "Pending"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}
              >
                {p.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
