"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatters";
import { Modal } from "@/components/ui/Modal";
import { Users, Eye, Search, Calendar, Phone, Mail, UserCheck, UserX } from "lucide-react";

export default function AdminCustomersPage() {
  const { customers, appointments, showToast } = useAppState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Admin Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Customer Registry ({customers.length})
          </h1>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by Name, Email, Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Customer Mobile Cards List */}
      <div className="space-y-4">
        {filteredCustomers.map((c) => (
          <div key={c.id} className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-amber-400 text-xs">{c.id}</span>
                <h3 className="font-bold text-slate-100 text-sm">{c.name}</h3>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  c.status === "Active"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}
              >
                {c.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Contact</span>
                <span className="text-slate-100 font-semibold">{c.email}</span>
                <span className="text-slate-400 block text-[11px]">{c.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Birth Info</span>
                <span className="text-slate-100">{c.dob} ({c.timeOfBirth})</span>
                <span className="text-slate-400 block text-[11px]">{c.placeOfBirth}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Activity</span>
                <span className="text-amber-300 font-bold">{c.totalAppointments} Consultations</span>
                <span className="text-slate-400 block text-[11px]">Last: {c.lastAppointment}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" icon={<Eye className="w-3.5 h-3.5" />} onClick={() => setSelectedCustomer(c)}>
                View Profile & History
              </Button>
              <button
                onClick={() => showToast(`Customer status toggled`, "info")}
                className="px-2.5 py-1 rounded-xl text-xs text-amber-300 hover:bg-amber-500/10 border border-amber-500/20 font-semibold"
              >
                {c.status === "Active" ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Customer Profile & History */}
      <Modal isOpen={!!selectedCustomer} onClose={() => setSelectedCustomer(null)} title="Client Profile Details">
        {selectedCustomer && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-900/80 p-4 rounded-xl space-y-2 border border-slate-800">
              <h4 className="font-bold text-slate-100 text-sm">{selectedCustomer.name}</h4>
              <div>Email: <span className="text-amber-300">{selectedCustomer.email}</span></div>
              <div>Phone: <span className="text-slate-200">{selectedCustomer.phone}</span></div>
              <div>DOB: <span className="text-slate-200">{selectedCustomer.dob} at {selectedCustomer.timeOfBirth}</span></div>
              <div>Place: <span className="text-slate-200">{selectedCustomer.placeOfBirth}</span></div>
            </div>

            <div>
              <h4 className="font-bold text-slate-100 text-xs mb-2">Booked Appointments History</h4>
              <div className="space-y-2">
                {appointments
                  .filter((a) => a.customerName === selectedCustomer.name)
                  .map((apt) => (
                    <div key={apt.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                      <div>
                        <div className="font-mono text-amber-400 font-bold">{apt.id}</div>
                        <div>{apt.serviceTitle}</div>
                        <div className="text-slate-400 text-[10px]">{apt.date}</div>
                      </div>
                      <span className="text-amber-300 font-bold">{formatPrice(apt.amount)}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
