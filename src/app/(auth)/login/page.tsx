"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BRAND_CONFIG } from "@/config/branding";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Sparkles, Key, User, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = Router();
  const { loginDemoUser, showToast } = useAppState();
  const [userId, setUserId] = useState("dhiren01");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);

  function Router() {
    return useRouter();
  }

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginDemoUser();
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      loginDemoUser();
      showToast("Signed in with Google (Demo)", "success");
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-stars">
      <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl gold-gradient-bg p-0.5 mx-auto mb-3 shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            {BRAND_CONFIG.websiteName}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100">Welcome Back</h1>
          <p className="text-xs text-slate-400">
            Sign in to access your Kundli charts, consultations & appointments.
          </p>
        </div>

        {/* Primary Auth Method: Google Sign-in */}
        <div className="space-y-4 mb-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-100 text-sm font-bold transition-all shadow-md active:scale-[0.99] cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-[11px] text-slate-500 uppercase tracking-widest font-semibold">
            Or Demo Login
          </span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Demo Login Credentials Callout Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-2xl mb-6 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Development Demo Credentials</span>
          </div>
          <div className="text-xs text-slate-300 font-mono space-y-0.5 pt-1">
            <div><span className="text-slate-400">User ID:</span> <span className="text-amber-200 font-bold">dhiren01</span></div>
            <div><span className="text-slate-400">Password:</span> <span className="text-amber-200 font-bold">1234</span></div>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleDemoSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              User ID / Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="Enter User ID or Email"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-300">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-amber-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="Enter Password"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="md"
            disabled={loading}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {loading ? "Signing in..." : "Sign In & Open Dashboard"}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Don't have an account?{" "}
          <Link href="/register" className="text-amber-400 font-bold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
