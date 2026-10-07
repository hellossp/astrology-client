"use client";

import React, { useState } from "react";
import { BRAND_CONFIG } from "@/config/branding";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Send, Sparkles, PhoneCall, HelpCircle, Bot, User, CheckCircle2 } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

export default function ChatPage() {
  const { faqs } = useAppState();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-0",
      sender: "bot",
      text: `Namaste 🙏 Welcome to ${BRAND_CONFIG.websiteName} Support Chat! Click any of the quick questions below or type your inquiry to view instant answers.`,
      time: "Just now"
    }
  ]);

  const [customInput, setCustomInput] = useState("");

  const handleSelectQuestion = (q: string, a: string) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const botMsg: ChatMessage = {
      id: `b-${Date.now() + 1}`,
      sender: "bot",
      text: a,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const userText = customInput;
    setCustomInput("");

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Find matching FAQ or fallback answer
    const matchedFaq = faqs.find((f) =>
      userText.toLowerCase().includes(f.question.toLowerCase().slice(0, 10))
    );

    const replyText = matchedFaq
      ? matchedFaq.answer
      : `Thank you for your question regarding "${userText}". You can book a direct 1-on-1 session with ${BRAND_CONFIG.astrologerName} or reach our desk directly on WhatsApp at ${BRAND_CONFIG.whatsappNumber}.`;

    const botMsg: ChatMessage = {
      id: `b-${Date.now() + 1}`,
      sender: "bot",
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase">
            <MessageSquare className="w-3.5 h-3.5" /> Support & FAQ Desk
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 mt-1">
            Astrology <span className="gold-gradient-text">Help Chat</span>
          </h1>
        </div>

        {/* WhatsApp / Direct Contact Button */}
        <a
          href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=Namaste!%20I%20have%20a%20question%20regarding%20astrology%20consultation.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 transition-all cursor-pointer"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Contact Astrologer on WhatsApp</span>
        </a>
      </div>

      {/* Main Chat Interface Window */}
      <div className="glass-panel rounded-3xl border border-amber-500/30 flex flex-col h-[650px] shadow-2xl overflow-hidden">
        {/* Top Chat Bar */}
        <div className="bg-slate-950/80 p-4 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400 font-bold text-xs">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">{BRAND_CONFIG.websiteName} Support Assistant</h3>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online Predefined Assistant
              </p>
            </div>
          </div>

          <Button href="/booking" variant="outline" size="sm">
            Book Consultation
          </Button>
        </div>

        {/* Quick Questions Pills Slider */}
        <div className="bg-slate-900/60 p-3 border-b border-slate-800 flex gap-2 overflow-x-auto no-scrollbar">
          {faqs.map((faq) => (
            <button
              key={faq.id}
              onClick={() => handleSelectQuestion(faq.question, faq.answer)}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all cursor-pointer"
            >
              {faq.question}
            </button>
          ))}
        </div>

        {/* Message History Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-950/40">
          {messages.map((msg) => {
            const isBot = msg.sender === "bot";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                  isBot ? "mr-auto" : "ml-auto flex-row-reverse"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isBot ? "gold-gradient-bg text-slate-950" : "bg-purple-600 text-white"
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1 ${
                    isBot
                      ? "bg-slate-900 border border-amber-500/20 text-slate-200 rounded-tl-none shadow-md"
                      : "gold-gradient-bg text-slate-950 font-medium rounded-tr-none shadow-md"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[10px] text-right font-semibold ${
                      isBot ? "text-slate-500" : "text-slate-900/70"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleCustomSend} className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type your question or click any quick pill above..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-400"
          />
          <Button type="submit" variant="primary" size="md" icon={<Send className="w-4 h-4" />}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
