"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/config/branding";
import { Button } from "@/components/ui/Button";
import { Sparkles, Mail, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-stars">
      <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl gold-gradient-bg p-0.5 mx-auto mb-2 shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            {BRAND_CONFIG.websiteName}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100">Reset Password</h1>
          <p className="text-xs text-slate-400">
            Enter your registered email address to receive password reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Check Your Inbox</h3>
            <p className="text-xs text-slate-300">
              We have sent password reset instructions to <span className="text-amber-300 font-semibold">{email}</span>.
            </p>
            <Button href="/login" variant="outline" fullWidth size="md" icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Registered Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" fullWidth size="md">
              Send Reset Link
            </Button>

            <div className="text-center pt-2">
              <Link href="/login" className="text-xs text-slate-400 hover:text-amber-300 flex items-center justify-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
