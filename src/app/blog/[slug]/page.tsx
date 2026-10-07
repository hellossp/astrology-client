"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppState } from "@/context/AppStateContext";
import { BRAND_CONFIG } from "@/config/branding";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";

function BlogDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const { blogPosts, showToast } = useAppState();

  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Back button */}
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300">
        <ArrowLeft className="w-4 h-4" /> Back to All Articles
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase border border-amber-500/30">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-b border-slate-800 pb-4">
          <span className="flex items-center gap-1 text-slate-200">
            <User className="w-3.5 h-3.5 text-amber-400" /> {post.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" /> {post.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> {post.readTime}
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="h-64 sm:h-96 w-full rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl relative">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Content Body */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-amber-500/20 space-y-6 text-sm text-slate-200 leading-relaxed font-normal whitespace-pre-line">
        {post.content}
      </div>

      {/* Share & Consultation CTA */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-amber-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-100 text-base">Have Questions About Your Chart?</h3>
          <p className="text-xs text-slate-300">Book a personal reading with {BRAND_CONFIG.astrologerName}.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={<Share2 className="w-4 h-4" />}
            onClick={() => showToast("Article link copied!", "info")}
          >
            Share
          </Button>
          <Button href="/booking" variant="primary" size="sm">
            Book Reading
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-amber-400 text-xs font-bold">Loading article...</div>}>
      <BlogDetailContent />
    </Suspense>
  );
}
