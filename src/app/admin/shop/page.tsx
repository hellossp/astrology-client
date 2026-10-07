"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatters";
import { ShoppingBag, Plus, Eye } from "lucide-react";

export default function AdminShopCMSPage() {
  const { shopProducts } = useAppState();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Content Management System
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Shop Catalog Preview CMS
          </h1>
          <p className="text-xs text-slate-400">
            Manage upcoming spiritual products, pricing placeholders, and launch badges.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
          Add Product Placeholder
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {shopProducts.map((p) => (
          <div key={p.id} className="glass-panel p-4 rounded-2xl border border-amber-500/20 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-36 rounded-xl overflow-hidden bg-slate-900 relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 font-bold text-[9px] px-2 py-0.5 rounded uppercase">
                  {p.status}
                </span>
              </div>
              <span className="text-[10px] font-bold text-amber-400">{p.category}</span>
              <h3 className="font-bold text-slate-100 text-xs">{p.name}</h3>
              <p className="text-[11px] text-slate-400 line-clamp-2">{p.description}</p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-sm font-extrabold text-amber-300">{formatPrice(p.estimatedPrice)}</span>
              <Button variant="outline" size="sm" icon={<Eye className="w-3.5 h-3.5" />}>
                Preview
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
