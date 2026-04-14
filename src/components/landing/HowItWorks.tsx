'use client';

import { Upload, Settings, Zap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Upload,
    title: 'Upload your resume',
    description:
      'Share your resume and basic profile. Wali learns about your experience, skills, and strengths.',
  },
  {
    icon: Settings,
    title: 'Set your preferences',
    description:
      'Tell Wali what roles you want, salary range, preferred locations, and industries. Be as specific as you like.',
  },
  {
    icon: Zap,
    title: 'Wali applies for you',
    description:
      'Wali searches LinkedIn and Nakuri, matches jobs to your profile, and submits applications automatically.',
  },
  {
    icon: CheckCircle,
    title: 'Track & land interviews',
    description:
      'Monitor every application from your dashboard. Wali handles the grind — you handle the interviews.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Four steps to automate
            <br />
            your job search
          </h2>
          <p className="text-neutral-500">
            From setup to submitted applications in under 5 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Step number */}
              <div className="text-[80px] font-bold text-neutral-100 leading-none mb-4 select-none">
                {i + 1}
              </div>
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center mb-4">
                <step.icon size={18} className="text-white" />
              </div>
              <h3 className="text-base font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
