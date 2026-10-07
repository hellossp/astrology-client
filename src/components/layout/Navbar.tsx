"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_CONFIG } from "@/config/branding";
import { useAppState } from "@/context/AppStateContext";
import { Sparkles, Menu, X, User, MessageSquare, Shield, Calendar, Sun, Scroll, ShoppingBag, Info, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAppState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide top header if inside admin routes (admin layout handles its own navigation)
  if (pathname.startsWith("/admin")) return null;

  const navLinks = [
    { href: "/", label: "Home", icon: Sun },
    { href: "/horoscope", label: "Horoscope", icon: Sparkles },
    { href: "/kundli", label: "Free Kundli", icon: Scroll },
    { href: "/services", label: "Services", icon: Calendar },
    { href: "/booking", label: "Book Consultation", icon: Calendar },
    { href: "/chat", label: "Support Chat", icon: MessageSquare },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/shop", label: "Shop", badge: "Soon", icon: ShoppingBag },
    { href: "/about", label: "About Astrologer", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo & Brand Placeholders */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gold-gradient-bg p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs tracking-wider text-amber-400 font-bold uppercase">
              {BRAND_CONFIG.logoText}
            </span>
            <span className="text-sm md:text-base font-extrabold text-slate-100 group-hover:text-amber-300 transition-colors">
              {BRAND_CONFIG.websiteName}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                  isActive
                    ? "text-amber-300 bg-amber-500/10 font-bold border border-amber-500/30"
                    : "text-slate-300 hover:text-amber-200 hover:bg-slate-900/60"
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] uppercase font-bold bg-amber-500/20 text-amber-400 rounded-full border border-amber-400/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick link to Admin for evaluation demo */}
          <Link
            href="/admin"
            className="px-2.5 py-1.5 text-xs text-amber-400/80 hover:text-amber-300 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-all flex items-center gap-1"
            title="Switch to Admin Panel"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </Link>

          {user ? (
            <Button href="/dashboard" variant="outline" size="sm" icon={<User className="w-4 h-4" />}>
              Dashboard
            </Button>
          ) : (
            <Button href="/login" variant="primary" size="sm" icon={<User className="w-4 h-4" />}>
              Login / Sign Up
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/admin"
            className="p-2 text-xs text-amber-400 border border-amber-500/30 rounded-lg bg-amber-500/10"
            title="Admin Panel"
          >
            <Shield className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-amber-400 rounded-lg bg-slate-900 border border-amber-500/20"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown / Slide-over */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 py-2">
            {navLinks.map((link) => {
              const IconComp = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                      : "bg-slate-900/80 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <IconComp className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            {user ? (
              <Button
                href="/dashboard"
                variant="primary"
                fullWidth
                icon={<User className="w-4 h-4" />}
                onClick={() => setMobileMenuOpen(false)}
              >
                Go to Dashboard
              </Button>
            ) : (
              <Button
                href="/login"
                variant="primary"
                fullWidth
                icon={<User className="w-4 h-4" />}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
