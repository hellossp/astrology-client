"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppStateContext";
import { BRAND_CONFIG } from "@/config/branding";
import { Button } from "@/components/ui/Button";
import { BookOpen, Sparkles, ArrowRight, Search } from "lucide-react";

export default function BlogListingPage() {
  const { blogPosts } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Astrology", "Vedic Astrology", "Kundli", "Marriage", "Career", "Spirituality"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase">
          <BookOpen className="w-3.5 h-3.5" /> Vedic Astrology Wisdom
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
          Astrology & <span className="gold-gradient-text">Planetary Articles</span>
        </h1>
        <p className="text-sm text-slate-300">
          In-depth guides on birth chart reading, transits, remedies, and spiritual wellbeing.
        </p>
      </div>

      {/* Featured Blog Banner */}
      {featuredPost && (
        <div className="glass-panel rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-amber-950/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
              <span className="bg-amber-500/20 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-full uppercase border border-amber-500/30">
                Featured Article • {featuredPost.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                <span>By {featuredPost.author}</span>
                <span>•</span>
                <span>{featuredPost.date}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <div className="pt-2">
                <Button href={`/blog/${featuredPost.slug}`} variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  Read Full Article
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      )}

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "gold-gradient-bg text-slate-950 shadow-md font-extrabold"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col group border border-amber-500/20"
          >
            <div className="h-48 w-full relative overflow-hidden bg-slate-900">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
              />
              <span className="absolute top-3 left-3 bg-slate-950/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
                {post.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-1.5">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span className="text-amber-300 font-semibold">By {post.author || BRAND_CONFIG.astrologerName}</span>
                </div>
                <h3 className="font-bold text-slate-100 text-base group-hover:text-amber-300 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="text-xs font-bold text-amber-400 flex items-center gap-1 pt-2 border-t border-slate-800/80">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
