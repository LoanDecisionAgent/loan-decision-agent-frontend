
"use client";

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-[#050511] text-white overflow-hidden selection:bg-indigo-500/30">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <nav className="relative z-50 w-full border-b border-white/5 bg-[#050511]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-24">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-2.5 bg-[#0A0A1F] rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
                <span className="material-symbols-outlined text-[24px] text-white">dataset</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">LoanDecision</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/docs" className="hidden md:block text-sm font-medium text-slate-400 hover:text-white transition-colors">API Reference</Link>
            <Link href="/contact" className="hidden md:block text-sm font-medium text-slate-400 hover:text-white transition-colors">Contact</Link>
            <Link href="/login" className="group relative px-6 py-3 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all group-hover:scale-105"></div>
              <span className="relative text-sm font-bold text-white flex items-center gap-2">
                Launch App
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-grow pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Hero Section */}
          <div className="max-w-4xl mb-40 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-8 hover:bg-indigo-500/20 transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              v2.0 Now Available
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-[0.95]">
              Decisions <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                at Scale.
              </span>
            </h1>

            <p className="text-2xl text-slate-400 leading-relaxed mb-12 max-w-2xl font-light">
              The high-frequency scoring engine for modern fintechs.
              <span className="text-indigo-400 font-normal"> Sub-50ms latency</span>,
              <span className="text-indigo-400 font-normal"> 99.99% uptime</span>, and
              <span className="text-indigo-400 font-normal"> bank-grade security</span>.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link href="/score" className="group relative h-16 px-10 rounded-2xl flex items-center gap-3 overflow-hidden bg-white text-[#050511] font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                <span className="relative z-10">Start Scoring</span>
                <span className="relative z-10 material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>

              <Link href="/login" className="h-16 px-10 rounded-2xl flex items-center gap-3 border border-white/10 hover:bg-white/5 font-bold text-lg transition-all hover:border-white/20">
                <span>View Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-white/5 pt-24">
            {[
              { title: 'Real-time Scoring', icon: 'bolt', desc: 'Synchronous decisioning in under 100ms for instant approvals.' },
              { title: 'Batch Processing', icon: 'layers', desc: 'Process millions of records asynchronously with high throughput.' },
              { title: 'Audit Trails', icon: 'history_edu', desc: 'Immutable logs for every decision and configuration change.' },
              { title: 'Vendor Control', icon: 'admin_panel_settings', desc: 'Granular access management for third-party partners.' },
            ].map((f, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-[#0A0A1F]/50 border border-white/5 hover:bg-[#0A0A1F] hover:border-indigo-500/30 transition-all duration-300">
                <div className="mb-6 w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500 group-hover:scale-110 transition-all duration-300">
                  <span className="material-symbols-outlined text-[28px] text-indigo-400 group-hover:text-white transition-colors">{f.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 bg-[#020205]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-sm font-mono text-slate-500">System Operational</span>
          </div>
          <p className="text-sm text-slate-600">© {currentYear} LoanDecision AI. Built for the future.</p>
        </div>
      </footer>
    </div>
  );
}
