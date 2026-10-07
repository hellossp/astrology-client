"use client";

import React from "react";
import { useAppState } from "@/context/AppStateContext";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAppState();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-2 pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start p-4 rounded-xl shadow-xl border backdrop-blur-lg transition-all duration-300 transform translate-y-0 ${
              isSuccess
                ? "bg-slate-900/95 border-amber-500/40 text-amber-200"
                : isError
                ? "bg-slate-900/95 border-red-500/40 text-red-200"
                : "bg-slate-900/95 border-purple-500/40 text-purple-200"
            }`}
          >
            <div className="shrink-0 mr-3 mt-0.5">
              {isSuccess && <CheckCircle className="w-5 h-5 text-amber-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-red-400" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-purple-400" />}
            </div>
            <div className="flex-1 text-sm font-medium leading-snug">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 ml-2 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
