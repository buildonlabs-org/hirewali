'use client';

import { useState } from 'react';
import {
  ChevronDown,
  Briefcase,
  FileText,
  MessageSquare,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WALI_SERVICES } from '@/lib/services';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Briefcase,
  FileText,
  MessageSquare,
  TrendingUp,
  User,
  Users,
};

export default function FutureServices() {
  const [expanded, setExpanded] = useState(false);
  const futureServices = WALI_SERVICES.filter((s) => s.comingSoon);
  const activeService = WALI_SERVICES.find((s) => s.available);

  return (
    <section id="services" className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-3">
            Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            One agent. Many talents.
          </h2>
          <p className="text-neutral-500">
            Wali is starting with job applications — but that&apos;s just the beginning.
          </p>
        </div>

        {/* Active service */}
        {activeService && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-6">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shrink-0">
                {iconMap[activeService.icon] &&
                  (() => {
                    const Icon = iconMap[activeService.icon];
                    return <Icon size={20} className="text-white" />;
                  })()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{activeService.name}</h3>
                  <span className="text-xs font-medium bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
                    Available now
                  </span>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed mb-3">
                  {activeService.description}
                </p>
                {activeService.pricing && (
                  <p className="text-sm font-medium text-black">
                    {activeService.pricing}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Expandable future services */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full bg-white rounded-2xl border border-neutral-200 p-6 flex items-center justify-between hover:border-neutral-300 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {futureServices.length} more services coming soon
            </span>
            <span className="text-xs text-neutral-400">
              Click to {expanded ? 'collapse' : 'explore'}
            </span>
          </div>
          <ChevronDown
            size={18}
            className={`text-neutral-400 transition-transform duration-300 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {futureServices.map((service) => {
                  const Icon = iconMap[service.icon];
                  return (
                    <div
                      key={service.id}
                      className="bg-white rounded-xl border border-neutral-200 p-6 opacity-80"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
                          {Icon && <Icon size={16} className="text-neutral-400" />}
                        </div>
                        <span className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase">
                          Coming soon
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold mb-1.5">{service.name}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
