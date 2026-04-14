'use client';

import { useState, useEffect } from 'react';
import { Check, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRICING_DATA, formatPrice, detectRegion } from '@/lib/pricing';
import type { PricingRegion } from '@/types';

const regionLabels: Record<PricingRegion, string> = {
  us: 'United States',
  eu: 'Europe',
  uk: 'United Kingdom',
  ca: 'Canada',
  au: 'Australia',
  in: 'India',
  sea: 'Southeast Asia',
  latam: 'Latin America',
  africa: 'Africa',
  mena: 'Middle East',
};

export default function Pricing() {
  const [region, setRegion] = useState<PricingRegion>('us');
  const [showRegionPicker, setShowRegionPicker] = useState(false);

  useEffect(() => {
    // Auto-detect region via timezone as a lightweight heuristic
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) {
      setRegion('in');
    } else if (tz.startsWith('Asia/Singapore') || tz.startsWith('Asia/Bangkok') || tz.startsWith('Asia/Jakarta') || tz.startsWith('Asia/Manila') || tz.startsWith('Asia/Ho_Chi_Minh')) {
      setRegion('sea');
    } else if (tz.startsWith('Europe/London')) {
      setRegion('uk');
    } else if (tz.startsWith('Europe/')) {
      setRegion('eu');
    } else if (tz.startsWith('America/Toronto') || tz.startsWith('America/Vancouver') || tz.startsWith('America/Edmonton')) {
      setRegion('ca');
    } else if (tz.startsWith('Australia/')) {
      setRegion('au');
    } else if (tz.startsWith('America/Sao_Paulo') || tz.startsWith('America/Mexico_City') || tz.startsWith('America/Buenos_Aires') || tz.startsWith('America/Bogota')) {
      setRegion('latam');
    } else if (tz.startsWith('Africa/')) {
      setRegion('africa');
    } else if (tz.startsWith('Asia/Dubai') || tz.startsWith('Asia/Riyadh') || tz.startsWith('Asia/Qatar')) {
      setRegion('mena');
    }
  }, []);

  const pricing = PRICING_DATA[region];

  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Pay per application.
            <br />
            No subscriptions.
          </h2>
          <p className="text-neutral-500 mb-6">
            Regionalized pricing so Wali is accessible everywhere. Buy a pack, use it
            anytime.
          </p>

          {/* Region selector */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowRegionPicker(!showRegionPicker)}
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black border border-neutral-200 rounded-lg px-4 py-2 transition-colors"
            >
              <Globe size={14} />
              <span>{pricing.regionName}</span>
              <span className="text-neutral-300">|</span>
              <span className="font-medium text-black">{pricing.currency}</span>
            </button>
            {showRegionPicker && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg p-2 z-10 min-w-[200px]">
                {Object.entries(regionLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setRegion(key as PricingRegion);
                      setShowRegionPicker(false);
                    }}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      region === key
                        ? 'bg-neutral-100 text-black font-medium'
                        : 'text-neutral-500 hover:bg-neutral-50 hover:text-black'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pricing.tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl border p-8 ${
                tier.popular
                  ? 'border-black bg-black text-white'
                  : 'border-neutral-200 bg-white'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-white text-black text-xs font-medium px-3 py-1 rounded-full">
                    Most popular
                  </span>
                </div>
              )}

              <h3
                className={`text-lg font-semibold mb-1 ${
                  tier.popular ? 'text-white' : ''
                }`}
              >
                {tier.name}
              </h3>
              <p
                className={`text-sm mb-6 ${
                  tier.popular ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                {tier.applications === 'unlimited'
                  ? 'Unlimited applications'
                  : `${tier.applications} applications`}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {formatPrice(tier.totalPrice, tier.currency, pricing.currencySymbol)}
                </span>
                <span
                  className={`text-sm ml-2 ${
                    tier.popular ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  one-time
                </span>
              </div>

              <p
                className={`text-sm mb-8 ${
                  tier.popular ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                {formatPrice(
                  tier.pricePerApplication,
                  tier.currency,
                  pricing.currencySymbol
                )}
                {' '}per application
              </p>

              <button
                className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${
                  tier.popular
                    ? 'bg-white text-black hover:bg-neutral-100'
                    : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                Get started
              </button>

              <ul className="mt-8 space-y-3">
                {[
                  'LinkedIn & Nakuri applications',
                  'Smart job matching',
                  'Application tracking dashboard',
                  tier.popular ? 'Priority processing' : null,
                  tier.name === 'Scale' ? 'Dedicated support' : null,
                ]
                  .filter(Boolean)
                  .map((feature, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm">
                      <Check
                        size={14}
                        className={tier.popular ? 'text-neutral-400' : 'text-neutral-400'}
                      />
                      <span
                        className={
                          tier.popular ? 'text-neutral-300' : 'text-neutral-600'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
