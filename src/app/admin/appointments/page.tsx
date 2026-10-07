"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatters";
import { Modal } from "@/components/ui/Modal";
import { CalendarCheck, CheckCircle2, XCircle, RefreshCw, Eye, Search, Filter } from "lucide-react";

export default function AdminAppointmentsPage() {
  const { appointments, updateAppointmentStatus, rescheduleAppointment, showToast } = useAppState();

  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [viewApt, setViewApt] = useState<any>(null);
  const [rescheduleApt, setRescheduleApt] = useState<any>(null);
  const [newDate, setNewDate] = useState("2026-10-22");
  const [newSlot, setNewSlot] = useState("11:00 AM - 11:45 AM");

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === "All" || apt.status === statusFilter;
    const matchesSearch =
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleRescheduleSubmit = () => {
    if (rescheduleApt) {
      rescheduleAppointment(rescheduleApt.id, newDate, newSlot);
      setRescheduleApt(null);
    }
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
            Appointments Control
          </h1>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
          {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === status
                  ? "gold-gradient-bg text-slate-950 shadow-md"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by ID or Client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Appointments Mobile Responsive List Cards / Table */}
      <div className="space-y-4">
        {filteredAppointments.map((apt) => (
          <div key={apt.id} className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-amber-400 text-sm">{apt.id}</span>
                <span className="text-xs font-extrabold text-slate-100">{apt.customerName}</span>
                <span className="text-xs text-slate-400">({apt.customerEmail})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {apt.consultationType}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    apt.status === "Confirmed"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : apt.status === "Pending"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : apt.status === "Completed"
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                  }`}
                >
                  {apt.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Service</span>
                <span className="font-bold text-slate-100">{apt.serviceTitle}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Schedule</span>
                <span className="font-bold text-slate-100">{apt.date} ({apt.timeSlot})</span>
              </div>
              <div>
                <span className="text-slate-400 block">Payment Status</span>
                <span className="font-bold text-emerald-400">{formatPrice(apt.amount)} • {apt.paymentStatus}</span>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-end gap-2">
              <Button variant="outline" size="sm" icon={<Eye className="w-3.5 h-3.5" />} onClick={() => setViewApt(apt)}>
                View Details
              </Button>

              {apt.status === "Pending" && (
                <Button variant="primary" size="sm" onClick={() => updateAppointmentStatus(apt.id, "Confirmed")}>
                  Approve
                </Button>
              )}

              {apt.status === "Confirmed" && (
                <Button variant="secondary" size="sm" onClick={() => updateAppointmentStatus(apt.id, "Completed")}>
                  Mark Complete
                </Button>
              )}

              <Button variant="outline" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />} onClick={() => setRescheduleApt(apt)}>
                Reschedule
              </Button>

              {apt.status !== "Cancelled" && (
                <button
                  onClick={() => updateAppointmentStatus(apt.id, "Cancelled")}
                  className="px-2.5 py-1 rounded-xl text-xs text-red-400 hover:bg-red-500/10 border border-red-500/20 font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal: View Details */}
      <Modal isOpen={!!viewApt} onClose={() => setViewApt(null)} title="Appointment Details">
        {viewApt && (
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">ID:</span>
              <span className="font-mono font-bold text-amber-300">{viewApt.id}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Client Name:</span>
              <span className="font-bold text-slate-100">{viewApt.customerName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Email & Phone:</span>
              <span className="font-bold text-slate-100">{viewApt.customerEmail} | {viewApt.customerPhone}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Birth DOB & Time:</span>
              <span className="font-bold text-slate-100">{viewApt.dob || "1994-08-15"} ({viewApt.timeOfBirth || "08:30 AM"})</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Place of Birth:</span>
              <span className="font-bold text-slate-100">{viewApt.placeOfBirth || "New Delhi"}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Service Fee:</span>
              <span className="font-extrabold text-amber-300">₹{viewApt.amount}</span>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Admin Reschedule */}
      <Modal isOpen={!!rescheduleApt} onClose={() => setRescheduleApt(null)} title="Reschedule Session">
        {rescheduleApt && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-300">Select new date & slot for <span className="font-bold text-amber-300">{rescheduleApt.customerName}</span>.</p>
            <div>
              <label className="block text-slate-400 mb-1">Date</label>
              <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Time Slot</label>
              <select value={newSlot} onChange={(e) => setNewSlot(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100">
                <option value="11:00 AM - 11:45 AM">11:00 AM - 11:45 AM</option>
                <option value="03:30 PM - 04:15 PM">03:30 PM - 04:15 PM</option>
                <option value="05:00 PM - 05:45 PM">05:00 PM - 05:45 PM</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setRescheduleApt(null)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={handleRescheduleSubmit}>Save Reschedule</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
