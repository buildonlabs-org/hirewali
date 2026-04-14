import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">W</span>
              </div>
              <span className="font-semibold tracking-tight">Wali</span>
            </div>
            <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
              Your AI agent for hire. Wali automates your job search so you can
              focus on what matters — landing the right role.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-medium tracking-wider text-neutral-400 uppercase mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Services
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wider text-neutral-400 uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Wali. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400">
            Powered by AI. Built for job seekers.
          </p>
        </div>
      </div>
    </footer>
  );
}
