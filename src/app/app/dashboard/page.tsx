'use client';

import Link from 'next/link';
import {
  Briefcase,
  ArrowRight,
  Bot,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const stats = [
  {
    label: 'Applications sent',
    value: '0',
    icon: Briefcase,
    change: null,
  },
  {
    label: 'In progress',
    value: '0',
    icon: Clock,
    change: null,
  },
  {
    label: 'Interviews',
    value: '0',
    icon: TrendingUp,
    change: null,
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Dashboard</h1>
        <p className="text-neutral-500 text-sm">
          Track your applications and manage your job search.
        </p>
      </div>

      {/* Getting started card */}
      <div className="bg-black rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Bot size={20} />
              <h2 className="text-lg font-semibold">Get started with Wali</h2>
            </div>
            <p className="text-neutral-400 text-sm max-w-md mb-6">
              Set up your job preferences and let Wali start applying for you.
              It takes less than 5 minutes.
            </p>
            <div className="flex gap-3">
              <Link
                href="/app/setup"
                className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-100 transition-colors group"
              >
                Set up job preferences
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
              <Link
                href="/app/billing"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
              >
                Buy applications
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center">
              <span className="text-4xl font-bold text-white/30">W</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-neutral-200 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
                {stat.label}
              </span>
              <stat.icon size={16} className="text-neutral-300" />
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-semibold">Recent Activity</h3>
        </div>
        <div className="px-6 py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <Briefcase size={20} className="text-neutral-300" />
          </div>
          <p className="text-sm text-neutral-500 mb-1">No applications yet</p>
          <p className="text-xs text-neutral-400">
            Set up your preferences and Wali will start applying for you.
          </p>
        </div>
      </div>

      {/* Wali status indicator */}
      <div className="mt-8 bg-white rounded-xl border border-neutral-200 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center">
              <Bot size={18} className="text-neutral-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Wali Agent</p>
              <p className="text-xs text-neutral-400">Waiting for setup</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-neutral-300" />
            <span className="text-xs text-neutral-400 font-medium">Idle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
