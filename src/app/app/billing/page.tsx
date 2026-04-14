'use client';

import { useState, useEffect } from 'react';
import { Check, Globe, CreditCard, Receipt, ArrowRight } from 'lucide-react';
import { PRICING_DATA, formatPrice } from '@/lib/pricing';
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

export default function BillingPage() {
  const [region, setRegion] = useState<PricingRegion>('us');
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) setRegion('in');
    else if (tz.startsWith('Asia/Singapore') || tz.startsWith('Asia/Bangkok')) setRegion('sea');
    else if (tz.startsWith('Europe/London')) setRegion('uk');
    else if (tz.startsWith('Europe/')) setRegion('eu');
    else if (tz.startsWith('Australia/')) setRegion('au');
  }, []);

  const pricing = PRICING_DATA[region];

  const handlePurchase = async (tierId: string) => {
    setPurchasing(tierId);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tierId, region }),
      });

      if (!response.ok) throw new Error('Checkout failed');

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Billing</h1>
        <p className="text-neutral-500 text-sm">
          Buy application credits for Wali.
        </p>
      </div>

      {/* Current balance */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-1">
              Application credits
            </p>
            <p className="text-4xl font-bold">0</p>
            <p className="text-sm text-neutral-400 mt-1">
              Credits never expire
            </p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center">
            <CreditCard size={24} className="text-neutral-300" />
          </div>
        </div>
      </div>

      {/* Region selector */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Buy credits</h2>
        <div className="relative">
          <button
            onClick={() => setShowRegionPicker(!showRegionPicker)}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black border border-neutral-200 rounded-lg px-3 py-1.5 transition-colors"
          >
            <Globe size={14} />
            <span>{pricing.regionName}</span>
          </button>
          {showRegionPicker && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg p-2 z-10 min-w-[200px]">
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

      {/* Pricing tiers */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {pricing.tiers.map((tier) => (
          <div
            key={tier.id}
            className={`rounded-2xl border p-6 transition-colors ${
              tier.popular
                ? 'border-black bg-black text-white'
                : 'border-neutral-200 bg-white hover:border-neutral-300'
            }`}
          >
            {tier.popular && (
              <span className="text-[10px] font-medium tracking-wider uppercase text-neutral-400 mb-2 block">
                Most popular
              </span>
            )}
            <h3 className="text-base font-semibold mb-0.5">{tier.name}</h3>
            <p
              className={`text-xs mb-4 ${
                tier.popular ? 'text-neutral-400' : 'text-neutral-400'
              }`}
            >
              {tier.applications === 'unlimited'
                ? 'Unlimited'
                : tier.applications}{' '}
              applications
            </p>
            <p className="text-3xl font-bold mb-1">
              {formatPrice(tier.totalPrice, tier.currency, pricing.currencySymbol)}
            </p>
            <p
              className={`text-xs mb-6 ${
                tier.popular ? 'text-neutral-400' : 'text-neutral-400'
              }`}
            >
              {formatPrice(
                tier.pricePerApplication,
                tier.currency,
                pricing.currencySymbol
              )}{' '}
              per application
            </p>
            <button
              onClick={() => handlePurchase(tier.id)}
              disabled={purchasing === tier.id}
              className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
                tier.popular
                  ? 'bg-white text-black hover:bg-neutral-100'
                  : 'bg-black text-white hover:bg-neutral-800'
              } disabled:opacity-50`}
            >
              {purchasing === tier.id ? 'Redirecting...' : 'Purchase'}
            </button>
          </div>
        ))}
      </div>

      {/* Transaction history */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center gap-2">
          <Receipt size={16} className="text-neutral-400" />
          <h3 className="text-sm font-semibold">Transaction history</h3>
        </div>
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-neutral-400">No transactions yet</p>
        </div>
      </div>
    </div>
  );
}
