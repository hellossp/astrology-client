import React from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export const metadata = {
  title: "Admin Control Center — Astrology Platform",
  description: "Manage appointments, customers, horoscopes, blogs, services, and payments.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-950 text-slate-100">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-8">
        {children}
      </main>
    </div>
  );
}
