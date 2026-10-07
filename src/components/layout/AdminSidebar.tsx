"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_CONFIG } from "@/config/branding";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Sparkles,
  BookOpen,
  Briefcase,
  Clock,
  CreditCard,
  HelpCircle,
  MessageSquare,
  ShoppingBag,
  Settings,
  ArrowLeft,
  Menu,
  X,
  ShieldCheck
} from "lucide-react";

export const adminNavLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarCheck },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/horoscope", label: "Horoscope CMS", icon: Sparkles },
  { href: "/admin/blog", label: "Blog CMS", icon: BookOpen },
  { href: "/admin/services", label: "Services CMS", icon: Briefcase },
  { href: "/admin/availability", label: "Availability Manager", icon: Clock },
  { href: "/admin/payments", label: "Payment Ledger", icon: CreditCard },
  { href: "/admin/faqs", label: "FAQ CMS", icon: HelpCircle },
  { href: "/admin/testimonials", label: "Testimonials CMS", icon: MessageSquare },
  { href: "/admin/shop", label: "Shop Preview CMS", icon: ShoppingBag },
  { href: "/admin/settings", label: "Platform Settings", icon: Settings },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Header for Admin */}
      <div className="lg:hidden sticky top-0 z-40 bg-slate-950 border-b border-amber-500/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="p-2 text-slate-300 hover:text-amber-400 bg-slate-900 rounded-lg border border-amber-500/20"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm text-slate-100">Admin Portal</span>
          </div>
        </div>
        <Link
          href="/"
          className="text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30 flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Admin</span>
        </Link>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-950 border-r border-amber-500/20 h-screen sticky top-0 shrink-0">
        {/* Header */}
        <div className="p-5 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gold-gradient-bg p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xs uppercase font-extrabold tracking-wider text-amber-400">
                Admin Control Center
              </h2>
              <p className="text-xs text-slate-300 font-bold truncate max-w-[130px]">
                {BRAND_CONFIG.websiteName}
              </p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {adminNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm font-bold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer Return to Public Web */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/60">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-amber-400 hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex">
          <div className="w-72 bg-slate-950 h-full border-r border-amber-500/20 flex flex-col p-4 animate-slideRight">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-slate-100 text-sm">Admin Navigation</span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-1">
              {adminNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/admin" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold ${
                      isActive
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold"
                        : "text-slate-400 hover:bg-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-900">
              <Link
                href="/"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-amber-400"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Exit Admin Mode</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
