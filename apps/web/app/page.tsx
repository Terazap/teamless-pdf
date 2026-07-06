'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Playground = dynamic(() => import('./components/Playground'), {
  ssr: false,
  loading: () => (
    <div className="w-full bg-slate-900/50 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center h-[600px] text-slate-500 gap-3">
      <div className="h-6 w-6 animate-spin border-2 border-indigo-500 border-t-transparent rounded-full" />
      <span className="text-sm">Loading Interactive Playground...</span>
    </div>
  )
});
import { 
  Terminal, 
  Layers, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Github, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[600px] pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-[300px] left-[10%] w-[800px] h-[600px] bg-indigo-500/5 rounded-full blur-[160px]" />
        <div className="absolute -top-[300px] right-[10%] w-[800px] h-[600px] bg-purple-500/5 rounded-full blur-[160px]" />
        
        {/* Fine grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-500" />
            <span className="font-extrabold text-md tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              TEAMLESS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium">
            <a href="#playground" className="hover:text-white transition-colors">Playground</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#comparison" className="hover:text-white transition-colors">Teamless vs Puppeteer</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              Docs <ExternalLink className="h-3 w-3" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>The Trojan Horse of PDF Engines</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          Beautiful PDFs with{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            React & Tailwind CSS
          </span>
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Resend-style open-source PDF generation engine for developers. Generate pixel-perfect reports, certificates, and invoices. No more Puppeteer or headless browser hell.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#playground"
            className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
          >
            <span>Try Interactive Demo</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <div className="w-full sm:w-auto bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 font-mono text-xs text-slate-300 flex items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-indigo-400" />
              <span>npx create-teamless@latest</span>
            </div>
          </div>
        </div>

        {/* Stat Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border border-slate-900 bg-slate-950/40 rounded-2xl p-6 backdrop-blur-sm">
          <div className="p-4 border-r border-slate-900/80 last:border-0">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">8x</h4>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Faster Render</p>
          </div>
          <div className="p-4 md:border-r border-slate-900/80 last:border-0">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">10x</h4>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Less Memory</p>
          </div>
          <div className="p-4 border-r border-slate-900/80 last:border-0">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">0</h4>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Chrome Binaries</p>
          </div>
          <div className="p-4 last:border-0">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">100%</h4>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Tailwind CSS</p>
          </div>
        </div>
      </section>

      {/* Playground Section */}
      <section id="playground" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-20 relative z-10">
        <Playground />
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/80 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
            Engineered for Developer Experience
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Teamless replaces heavy Chrome automation with lightweight, type-safe React layouts that compile directly into vector PDF instructions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur-sm flex flex-col justify-between group hover:border-slate-800 transition-all">
            <Cpu className="h-8 w-8 text-indigo-500 mb-6" />
            <div>
              <h3 className="text-base font-bold text-white mb-2">In-Process Layout Calculations</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Uses Yoga Flexbox layout engine directly in your node runtime, eliminating the overhead of spinning up heavy headless browser instances.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur-sm flex flex-col justify-between group hover:border-slate-800 transition-all">
            <Zap className="h-8 w-8 text-indigo-500 mb-6" />
            <div>
              <h3 className="text-base font-bold text-white mb-2">Tailwind Utility Compilation</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Write style declarations using native Tailwind CSS utility classes. Compatible with Tailwind v4 theme specifications.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur-sm flex flex-col justify-between group hover:border-slate-800 transition-all">
            <BookOpen className="h-8 w-8 text-indigo-500 mb-6" />
            <div>
              <h3 className="text-base font-bold text-white mb-2">Instant Scaffolding CLI</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Run one command to initialize a fully typed layout project pre-configured with dev scripts, tsconfig, and high-quality templates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section id="comparison" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/80 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
            How does Teamless compare?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Stop running mini cloud servers just to draw tables and text on a PDF sheet.
          </p>
        </div>

        <div className="max-w-4xl mx-auto border border-slate-900 rounded-3xl overflow-hidden bg-slate-950/40 backdrop-blur-sm shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-900/20 text-slate-400 font-semibold">
                <th className="p-4 sm:p-5">Metric</th>
                <th className="p-4 sm:p-5 text-rose-400">Puppeteer / Headless Chrome</th>
                <th className="p-4 sm:p-5 text-emerald-400">Teamless Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-slate-300">
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-white">Compilation Latency</td>
                <td className="p-4 sm:p-5 text-slate-500">1,200ms - 2,500ms (cold start)</td>
                <td className="p-4 sm:p-5 font-medium text-emerald-300">80ms - 150ms (in-process)</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-white">Memory Utilization</td>
                <td className="p-4 sm:p-5 text-slate-500">150MB - 300MB per process</td>
                <td className="p-4 sm:p-5 font-medium text-emerald-300">8MB - 15MB per process</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-white">Style System</td>
                <td className="p-4 sm:p-5 text-slate-500">HTML/CSS (untyped, browser print bugs)</td>
                <td className="p-4 sm:p-5 font-medium text-emerald-300">React + Tailwind (typed autocompletes)</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-white">Infrastructure Complexity</td>
                <td className="p-4 sm:p-5 text-slate-500">Binary compilation, memory leaks, timeouts</td>
                <td className="p-4 sm:p-5 font-medium text-emerald-300">Zero dependencies, serverless-native</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-white">Output Optimization</td>
                <td className="p-4 sm:p-5 text-slate-500">Heavy raster elements, large files</td>
                <td className="p-4 sm:p-5 font-medium text-emerald-300">Vector-optimized, tiny footprint</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer Commercial CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/80 text-center relative z-10">
        <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
          Scaling to Millions of PDFs?
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed mb-8">
          Check out <span className="text-indigo-400 font-semibold">Teamless Cloud</span> — our fully managed platform. Get templating registries, API gateways, visual builders, and instant webhooks.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://teamlessapp.me"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl transition-all text-xs flex items-center gap-2"
          >
            <span>Visit teamlessapp.me</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <p className="text-[10px] text-slate-600 mt-12">
          © 2026 Teamless. MIT Licensed.
        </p>
      </section>
    </div>
  );
}
