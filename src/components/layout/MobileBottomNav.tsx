"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Scroll, Calendar, ShoppingBag, User } from "lucide-react";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  // Hide bottom nav in admin screens
  if (pathname.startsWith("/admin")) return null;

  const bottomNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/horoscope", label: "Horoscope", icon: Sparkles },
    { href: "/kundli", label: "Kundli", icon: Scroll },
    { href: "/booking", label: "Booking", icon: Calendar },
    { href: "/shop", label: "Shop", icon: ShoppingBag, badge: "Soon" },
    { href: "/dashboard", label: "Profile", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-amber-500/20 px-2 py-1.5 shadow-2xl">
      <div className="grid grid-cols-6 gap-1 items-center max-w-md mx-auto">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
                isActive
                  ? "text-amber-300 font-bold bg-amber-500/15"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "text-amber-400 scale-110" : "text-slate-400"}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-slate-950 font-extrabold text-[8px] px-1 rounded-full uppercase">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate w-full text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
