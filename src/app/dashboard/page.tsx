"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppStateContext";
import { BRAND_CONFIG } from "@/config/branding";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatters";
import { Modal } from "@/components/ui/Modal";
import {
  User,
  Calendar,
  Clock,
  Scroll,
  CreditCard,
  Download,
  Bookmark,
  Settings,
  LogOut,
  Video,
  MapPin,
  XCircle,
  RefreshCw,
  Eye,
  CheckCircle2,
  Sparkles,
  Plus
} from "lucide-react";

export default function DashboardPage() {
  const {
    user,
    logoutUser,
    appointments,
    savedKundlis,
    payments,
    rescheduleAppointment,
    cancelAppointment,
    showToast
  } = useAppState();

  const [activeTab, setActiveTab] = useState<string>("appointments");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [newRescheduleDate, setNewRescheduleDate] = useState("2026-10-20");
  const [newRescheduleSlot, setNewRescheduleSlot] = useState("03:30 PM - 04:15 PM");

  const displayName = user?.name || "Dhiren Sharma";

  // Filter upcoming & past appointments
  const upcomingAppointments = appointments.filter(
    (a) => a.status === "Confirmed" || a.status === "Pending"
  );
  const pastAppointments = appointments.filter(
    (a) => a.status === "Completed" || a.status === "Cancelled"
  );

  const handleRescheduleSubmit = () => {
    if (selectedAppointment) {
      rescheduleAppointment(selectedAppointment.id, newRescheduleDate, newRescheduleSlot);
      setIsRescheduleOpen(false);
      setSelectedAppointment(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* WELCOME BANNER SECTION */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-amber-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"}
            alt={displayName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/50 shadow-lg shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                Hello, {displayName.split(" ")[0]} 👋
              </h1>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Premium Member
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Welcome to your personal astrology portal. Manage your Kundlis, bookings & reports.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button href="/booking" variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
            Book Consultation
          </Button>
          <Button href="/profile" variant="outline" size="sm" icon={<User className="w-4 h-4" />}>
            Edit Profile
          </Button>
          <button
            onClick={logoutUser}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors border border-slate-800"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* UPCOMING APPOINTMENT HIGHLIGHT CARD */}
      {upcomingAppointments.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/40 bg-stars space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Next Upcoming Consultation
            </span>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {upcomingAppointments[0].status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Service</span>
              <h3 className="font-bold text-slate-100 text-base">{upcomingAppointments[0].serviceTitle}</h3>
              <p className="text-xs text-amber-300">With {upcomingAppointments[0].astrologerName}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400">Date & Time Slot</span>
              <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{upcomingAppointments[0].date} ({upcomingAppointments[0].timeSlot})</span>
              </div>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                {upcomingAppointments[0].consultationType === "Online" ? (
                  <>
                    <Video className="w-3.5 h-3.5 text-blue-400" /> Google Meet Video Call
                  </>
                ) : (
                  <>
                    <MapPin className="w-3.5 h-3.5 text-rose-400" /> Delhi Center
                  </>
                )}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <Button
                variant="outline"
                size="sm"
                icon={<Eye className="w-3.5 h-3.5" />}
                onClick={() => setSelectedAppointment(upcomingAppointments[0])}
              >
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<RefreshCw className="w-3.5 h-3.5" />}
                onClick={() => {
                  setSelectedAppointment(upcomingAppointments[0]);
                  setIsRescheduleOpen(true);
                }}
              >
                Reschedule
              </Button>
              <button
                onClick={() => cancelAppointment(upcomingAppointments[0].id)}
                className="p-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl border border-red-500/20"
                title="Cancel Appointment"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB NAVIGATION BAR */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-800">
        {[
          { id: "appointments", label: "My Appointments", icon: Calendar, badge: appointments.length },
          { id: "kundli", label: "My Kundli", icon: Scroll, badge: savedKundlis.length },
          { id: "reports", label: "Downloaded Reports", icon: Download, badge: 2 },
          { id: "payments", label: "Payment History", icon: CreditCard, badge: payments.length },
          { id: "horoscopes", label: "Saved Horoscopes", icon: Bookmark, badge: 1 },
          { id: "settings", label: "Settings", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-extrabold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: MY APPOINTMENTS */}
      {activeTab === "appointments" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Upcoming Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Upcoming Appointments ({upcomingAppointments.length})
            </h3>
            {upcomingAppointments.length === 0 ? (
              <div className="glass-panel p-8 rounded-2xl text-center text-slate-400 space-y-3">
                <p className="text-xs">No upcoming appointments scheduled.</p>
                <Button href="/booking" variant="primary" size="sm">
                  Book a Consultation
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400">{apt.id}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {apt.status}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm">{apt.serviceTitle}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {apt.date} • {apt.timeSlot}
                      </p>
                      <p className="text-[11px] text-amber-300 mt-1">
                        Mode: {apt.consultationType} Video Consultation
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">₹{apt.amount}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedAppointment(apt);
                            setIsRescheduleOpen(true);
                          }}
                        >
                          Reschedule
                        </Button>
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="px-2.5 py-1 text-xs text-red-400 hover:bg-red-500/10 rounded-lg border border-red-500/20"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Section */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Past Consultations ({pastAppointments.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pastAppointments.map((apt) => (
                <div key={apt.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 opacity-90">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">{apt.id}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        apt.status === "Completed"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : "bg-red-500/20 text-red-300 border border-red-500/30"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 text-sm">{apt.serviceTitle}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {apt.date} • {apt.timeSlot}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Amount: ₹{apt.amount}</span>
                    {apt.status === "Completed" && (
                      <button
                        onClick={() => showToast("Downloading consultation recording...", "info")}
                        className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Download className="w-3.5 h-3.5" /> Audio Recording
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: MY KUNDLI */}
      {activeTab === "kundli" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Saved Birth Charts ({savedKundlis.length})
            </h3>
            <Button href="/kundli" variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
              Generate New Kundli
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedKundlis.map((k) => (
              <div key={k.id} className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">{k.id}</span>
                  <span className="text-[10px] text-slate-400">Generated: {k.generatedAt}</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-base">{k.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    DOB: {k.dob} ({k.time}) • Place: {k.place}
                  </p>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl text-xs space-y-1 border border-slate-800">
                  <div>Rashi: <span className="text-amber-300 font-bold">{k.rashi}</span></div>
                  <div>Lagna: <span className="text-amber-300 font-bold">{k.lagna}</span></div>
                  <div>Nakshatra: <span className="text-amber-300 font-bold">{k.nakshatra}</span></div>
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <Button href="/kundli" variant="outline" size="sm" fullWidth icon={<Eye className="w-3.5 h-3.5" />}>
                    View Full Chart
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    icon={<Download className="w-3.5 h-3.5" />}
                    onClick={() => showToast("Downloading Kundli PDF...", "success")}
                  >
                    PDF Report
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: DOWNLOADED REPORTS */}
      {activeTab === "reports" && (
        <div className="space-y-4 animate-fadeIn">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
            Downloaded Reports
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-100 text-sm">Full Janam Kundli Report</h4>
                <p className="text-xs text-slate-400 mt-0.5">PDF • 14 Pages • Generated Oct 2026</p>
              </div>
              <Button variant="primary" size="sm" icon={<Download className="w-4 h-4" />} onClick={() => showToast("Downloading PDF...", "success")}>
                Download
              </Button>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-100 text-sm">Vastu Remedies Map</h4>
                <p className="text-xs text-slate-400 mt-0.5">PDF • 5 Pages • Generated Sep 2026</p>
              </div>
              <Button variant="primary" size="sm" icon={<Download className="w-4 h-4" />} onClick={() => showToast("Downloading PDF...", "success")}>
                Download
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: PAYMENT HISTORY */}
      {activeTab === "payments" && (
        <div className="space-y-4 animate-fadeIn">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
            Payment Transactions ({payments.length})
          </h3>

          <div className="space-y-3">
            {payments.map((pay) => (
              <div
                key={pay.id}
                className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-mono font-bold text-amber-300">{pay.paymentId}</div>
                  <div className="font-bold text-slate-100 text-sm mt-0.5">{pay.serviceTitle}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Date: {pay.date} • Method: {pay.method}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-4">
                  <span className="text-base font-extrabold text-slate-100">{formatPrice(pay.amount)}</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {pay.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: SAVED HOROSCOPES */}
      {activeTab === "horoscopes" && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 animate-fadeIn">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
            Saved Horoscope Predictions
          </h3>
          <p className="text-xs text-slate-300">
            You have 1 bookmarked horoscope: <span className="text-amber-300 font-bold">Leo (Daily)</span>.
          </p>
          <Button href="/horoscope?sign=leo" variant="outline" size="sm">
            Read Saved Horoscope →
          </Button>
        </div>
      )}

      {/* TAB CONTENT 6: SETTINGS */}
      {activeTab === "settings" && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn max-w-xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
            Account Preferences
          </h3>
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <div>
                <div className="font-bold text-slate-100">Email Notifications</div>
                <div className="text-slate-400 text-[11px]">Receive appointment reminders & horoscope updates</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber-500" />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <div>
                <div className="font-bold text-slate-100">WhatsApp Consultation Reminders</div>
                <div className="text-slate-400 text-[11px]">Get instant Google Meet links 15 mins prior</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber-500" />
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RESCHEDULE APPOINTMENT */}
      <Modal
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        title="Reschedule Appointment"
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              Rescheduling appointment <span className="font-mono text-amber-400 font-bold">{selectedAppointment.id}</span> ({selectedAppointment.serviceTitle}).
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">New Date</label>
              <input
                type="date"
                value={newRescheduleDate}
                onChange={(e) => setNewRescheduleDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">New Time Slot</label>
              <select
                value={newRescheduleSlot}
                onChange={(e) => setNewRescheduleSlot(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              >
                <option value="10:00 AM - 10:45 AM">10:00 AM - 10:45 AM</option>
                <option value="11:00 AM - 11:45 AM">11:00 AM - 11:45 AM</option>
                <option value="03:30 PM - 04:15 PM">03:30 PM - 04:15 PM</option>
                <option value="05:00 PM - 05:45 PM">05:00 PM - 05:45 PM</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => setIsRescheduleOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleRescheduleSubmit}>
                Confirm Reschedule
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
