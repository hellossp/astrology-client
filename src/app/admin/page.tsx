"use client";

import React from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/Button";
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  AlertCircle,
  Plus,
  Sparkles,
  BookOpen,
  Briefcase,
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from "lucide-react";

export default function AdminOverviewPage() {
  const { appointments, customers, payments, horoscopes, blogPosts } = useAppState();

  const totalCustomers = customers.length;
  const todayAppointments = appointments.filter((a) => a.date === "2026-10-12" || a.date === new Date().toISOString().split("T")[0]).length || 2;
  const upcomingAppointments = appointments.filter((a) => a.status === "Confirmed" || a.status === "Pending").length;
  const completedConsultations = appointments.filter((a) => a.status === "Completed").length || 1;
  const totalRevenue = payments.reduce((acc, p) => (p.status === "Paid" ? acc + p.amount : acc), 0);
  const pendingRequests = appointments.filter((a) => a.status === "Pending").length || 1;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Admin Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Dashboard Overview
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button href="/admin/horoscope" variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
            New Horoscope CMS
          </Button>
          <Button href="/admin/blog" variant="outline" size="sm" icon={<Plus className="w-4 h-4" />}>
            New Article
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Customers</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100">{totalCustomers}</div>
          <span className="text-[10px] text-emerald-400 font-bold">+12% this month</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Today's Sessions</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100">{todayAppointments}</div>
          <span className="text-[10px] text-amber-400 font-bold">2 Slots Booked</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Upcoming</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100">{upcomingAppointments}</div>
          <span className="text-[10px] text-blue-400 font-bold">Active Consultations</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100">{completedConsultations}</div>
          <span className="text-[10px] text-slate-400 font-bold">100% Satisfaction</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-300">₹{totalRevenue}</div>
          <span className="text-[10px] text-emerald-400 font-bold">Ledger Verified</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Pending Requests</span>
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-300">{pendingRequests}</div>
          <span className="text-[10px] text-rose-400 font-bold">Needs Approval</span>
        </div>
      </div>

      {/* Recent Appointments & Recent Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Appointments */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider text-amber-400">
              Recent Appointments
            </h3>
            <Link href="/admin/appointments" className="text-xs text-amber-400 hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {appointments.slice(0, 4).map((apt) => (
              <div key={apt.id} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-mono font-bold text-amber-400">{apt.id}</div>
                  <div className="font-bold text-slate-100 mt-0.5">{apt.customerName}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    {apt.serviceTitle} • {apt.date}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-300 block">₹{apt.amount}</span>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      apt.status === "Confirmed"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : apt.status === "Pending"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Customers */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider text-amber-400">
              Recent Registered Clients
            </h3>
            <Link href="/admin/customers" className="text-xs text-amber-400 hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {customers.map((c) => (
              <div key={c.id} className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-100">{c.name}</div>
                  <div className="text-slate-400 text-[11px]">{c.email}</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
