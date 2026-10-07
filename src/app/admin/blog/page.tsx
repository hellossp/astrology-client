"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { BlogPost } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { BookOpen, Plus, Edit, Trash2, Eye, Sparkles } from "lucide-react";

export default function AdminBlogCMSPage() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, showToast } = useAppState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Vedic Astrology" as BlogPost["category"],
    excerpt: "",
    content: "",
    readTime: "5 min read",
    author: "YOUR ASTROLOGER NAME",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80"
  });

  const handleOpenAdd = () => {
    setEditingPost(null);
    setForm({
      title: "",
      slug: "",
      category: "Vedic Astrology",
      excerpt: "",
      content: "",
      readTime: "5 min read",
      author: "YOUR ASTROLOGER NAME",
      image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      readTime: post.readTime,
      author: post.author,
      image: post.image
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    if (editingPost) {
      updateBlogPost(editingPost.id, {
        ...form,
        slug: generatedSlug
      });
    } else {
      addBlogPost({
        ...form,
        slug: generatedSlug,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Content Management System
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Blog Articles CMS
          </h1>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAdd}>
          Create New Article
        </Button>
      </div>

      {/* Blog Posts List Grid */}
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="glass-panel p-5 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={post.image} alt={post.title} className="w-16 h-16 rounded-xl object-cover border border-amber-500/30 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {post.category}
                </span>
                <h3 className="font-bold text-slate-100 text-sm mt-1">{post.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-1">{post.excerpt}</p>
                <div className="text-[11px] text-slate-500 mt-1">
                  Published: {post.date} • By {post.author}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <Button href={`/blog/${post.slug}`} variant="outline" size="sm" icon={<Eye className="w-3.5 h-3.5" />}>
                View
              </Button>
              <Button variant="secondary" size="sm" icon={<Edit className="w-3.5 h-3.5" />} onClick={() => handleOpenEdit(post)}>
                Edit
              </Button>
              <button
                onClick={() => deleteBlogPost(post.id)}
                className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl border border-red-500/20"
                title="Delete Post"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create / Edit Blog */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPost ? "Edit Blog Post" : "Create New Blog Post"} maxWidth="lg">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Article Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
              placeholder="e.g. Understanding Saturn Transit in 2026"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
              >
                <option value="Vedic Astrology">Vedic Astrology</option>
                <option value="Astrology">Astrology</option>
                <option value="Kundli">Kundli</option>
                <option value="Marriage">Marriage</option>
                <option value="Career">Career</option>
                <option value="Spirituality">Spirituality</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Cover Image URL</label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Short Excerpt / Description</label>
            <textarea
              rows={2}
              required
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Full Article Content</label>
            <textarea
              rows={6}
              required
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingPost ? "Update Article" : "Publish Article"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
