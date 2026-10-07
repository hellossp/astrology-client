"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/Button";
import { User, Mail, Phone, Calendar, Clock, MapPin, Save, LogOut, ShieldCheck, Bell, Lock } from "lucide-react";

export default function ProfilePage() {
  const { user, updateUserProfile, logoutUser } = useAppState();

  const [form, setForm] = useState({
    name: user?.name || "Dhiren Sharma",
    email: user?.email || "dhiren@example.com",
    phone: user?.phone || "+91 98765 43210",
    dob: user?.dob || "1994-08-15",
    timeOfBirth: user?.timeOfBirth || "08:30 AM",
    placeOfBirth: user?.placeOfBirth || "New Delhi",
    avatarUrl: user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(form);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase">
          <User className="w-3.5 h-3.5" /> Customer Profile
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          Personal <span className="gold-gradient-text">Profile Details</span>
        </h1>
      </div>

      {/* Main Profile Form Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <img
              src={form.avatarUrl}
              alt={form.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400/50 shadow-xl"
            />
            <div>
              <h2 className="text-xl font-bold text-slate-100">{form.name}</h2>
              <p className="text-xs text-slate-400">{form.email}</p>
              <span className="inline-block mt-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Verified Account
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <Button variant="primary" size="sm" icon={<Save className="w-4 h-4" />} onClick={handleSave}>
                Save Changes
              </Button>
            )}
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  disabled={!isEditing}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 disabled:opacity-70 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  disabled={!isEditing}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 disabled:opacity-70 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  disabled={!isEditing}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 disabled:opacity-70 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Birth</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  disabled={!isEditing}
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 disabled:opacity-70 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Time of Birth</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  disabled={!isEditing}
                  value={form.timeOfBirth}
                  onChange={(e) => setForm({ ...form, timeOfBirth: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 disabled:opacity-70 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Place of Birth</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  disabled={!isEditing}
                  value={form.placeOfBirth}
                  onChange={(e) => setForm({ ...form, placeOfBirth: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 disabled:opacity-70 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Account & Privacy Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <Bell className="w-4 h-4" /> Notification Preferences
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Manage SMS, Email, and WhatsApp consultation alerts.
          </p>
          <Button variant="outline" size="sm" fullWidth>
            Manage Notifications
          </Button>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <Lock className="w-4 h-4" /> Privacy & Security
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Change your account password and review active login sessions.
          </p>
          <Button variant="outline" size="sm" fullWidth>
            Security Settings
          </Button>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase">
            <LogOut className="w-4 h-4" /> Session Action
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sign out of your account on this device.
          </p>
          <Button variant="danger" size="sm" fullWidth onClick={logoutUser}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
