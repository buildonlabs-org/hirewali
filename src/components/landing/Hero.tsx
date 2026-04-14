'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-600 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8">
            <Sparkles size={13} />
            <span>AI Agent for Hire</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            Stop applying.
            <br />
            <span className="text-neutral-400">Start hiring Wali.</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-500 leading-relaxed max-w-xl mb-10">
            Wali is your AI agent that applies to jobs on your behalf across
            LinkedIn and Nakuri. Set your preferences once, and let Wali do the
            rest.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/app/setup"
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-7 py-3.5 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors group"
            >
              Hire Wali now
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-neutral-100 text-black px-7 py-3.5 rounded-xl text-sm font-medium hover:bg-neutral-200 transition-colors"
            >
              See how it works
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-14 flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-[10px] font-medium text-neutral-500"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-neutral-500">
              <span className="text-black font-medium">2,400+</span> job
              seekers trust Wali
            </p>
          </div>
        </motion.div>

        {/* Floating card preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block absolute top-32 right-0 w-[380px]"
        >
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl shadow-neutral-200/50 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <div>
                <p className="text-sm font-medium">Wali Agent</p>
                <p className="text-xs text-neutral-400">Working now</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-emerald-600 font-medium">Active</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { company: 'Stripe', role: 'Senior Engineer', status: 'Applied' },
                { company: 'Notion', role: 'Full Stack Dev', status: 'Applied' },
                { company: 'Linear', role: 'Software Engineer', status: 'Applying...' },
              ].map((job, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-neutral-50 rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{job.role}</p>
                    <p className="text-xs text-neutral-400">{job.company}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      job.status === 'Applying...'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-400">Today&apos;s progress</span>
              <span className="text-sm font-semibold">47 applications</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
