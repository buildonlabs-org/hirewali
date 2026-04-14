'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">Wali</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm text-neutral-500 hover:text-black transition-colors"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="text-sm text-neutral-500 hover:text-black transition-colors"
          >
            Pricing
          </a>
          <a
            href="#services"
            className="text-sm text-neutral-500 hover:text-black transition-colors"
          >
            Services
          </a>
          <Link
            href="/app/dashboard"
            className="text-sm text-neutral-500 hover:text-black transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/app/setup"
            className="bg-black text-white text-sm px-5 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Get started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-neutral-100 px-6 py-4 space-y-3">
          <a
            href="#how-it-works"
            className="block text-sm text-neutral-500 hover:text-black py-2"
            onClick={() => setMobileOpen(false)}
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="block text-sm text-neutral-500 hover:text-black py-2"
            onClick={() => setMobileOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#services"
            className="block text-sm text-neutral-500 hover:text-black py-2"
            onClick={() => setMobileOpen(false)}
          >
            Services
          </a>
          <Link
            href="/app/dashboard"
            className="block text-sm text-neutral-500 hover:text-black py-2"
          >
            Log in
          </Link>
          <Link
            href="/app/setup"
            className="block bg-black text-white text-sm px-5 py-2.5 rounded-lg text-center hover:bg-neutral-800 transition-colors"
          >
            Get started
          </Link>
        </div>
      )}
    </nav>
  );
}
