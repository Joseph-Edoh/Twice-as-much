import React from 'react';
import { ActiveView } from '../types';
import { TwiceAsMuchLogo } from './TwiceAsMuchLogo';

interface HeroProps {
  onNavigate: (view: ActiveView) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative overflow-hidden bg-[#070D24] border-b border-[rgba(213,168,72,0.2)]">
      {/* Subtle ambient lighting inspired by the logo navy and gold */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#16296E]/30 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#D5A848]/10 blur-3xl rounded-full pointer-events-none" />

      {/* Hero Visual Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Dual CTA */}
          <div className="lg:col-span-6 z-10 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D5A848] shadow-sm shadow-[#D5A848]" />
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#F3D17A] font-semibold">
                TWICE AS MUCH · Haute Atelier
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.08] text-balance">
              Sculpted Architecture. <br />
              <span className="italic font-light text-[#E8EDF8]">Your Exact Anatomy.</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-light">
              Welcome to the official maison of <strong className="text-white font-medium">TWICE AS MUCH</strong>. Bridging high-fashion European master tailoring and West African royal prestige with millimeter precision. Explore our ready-to-wear collections—from Grand Agbadas and bespoke Senator suits to handcrafted Italian sneakers—or commission a bespoke garment tailored to your exact measurements.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('make-for-me')}
                className="px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#D5A848] via-[#F3D17A] to-[#D5A848] text-[#070D24] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-[#D5A848]/25 flex items-center justify-center gap-2 group"
              >
                <span>Custom Tailor: Make For Me</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                onClick={() => onNavigate('catalog')}
                className="px-7 py-3.5 rounded-lg border border-[rgba(213,168,72,0.35)] bg-[#0C1642]/60 hover:bg-[#112056] text-white font-medium text-xs uppercase tracking-widest transition-all flex items-center justify-center shadow-md"
              >
                Explore Collection
              </button>
            </div>

            {/* Micro proof markers */}
            <div className="pt-6 border-t border-[rgba(213,168,72,0.2)] flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-neutral-300 font-mono">
              <div>
                <span className="text-[#F3D17A] font-semibold">100%</span> Bespoke Patterning
              </div>
              <div className="text-[#D5A848]">·</div>
              <div>
                <span className="text-[#F3D17A] font-semibold">Grand Agbada & Senator</span> Attire
              </div>
              <div className="text-[#D5A848]">·</div>
              <div>
                <span className="text-[#F3D17A] font-semibold">Italian Leather</span> Sneakers
              </div>
              <div className="text-[#D5A848]">·</div>
              <div>
                <span className="text-[#F3D17A] font-semibold">7–14d</span> Atelier Lead Time
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Res Fashion Editorial Image with Floating Atelier Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-[rgba(213,168,72,0.3)] bg-black/60 shadow-2xl">
              <img
                src="/src/assets/images/hero_atelier_fashion_1791567148622.jpg"
                alt="TWICE AS MUCH Haute Couture bespoke tailoring"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D24]/90 via-[#070D24]/25 to-transparent" />

              {/* Floating Badge in upper corner */}
              <div className="absolute top-4 right-4 bg-[#070D24]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[rgba(213,168,72,0.4)] shadow-lg">
                <TwiceAsMuchLogo size="sm" />
              </div>

              {/* Floating Overlay Card showcasing the Bespoke Atelier Workflow */}
              <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-xl bg-[#091336]/90 backdrop-blur-md border border-[rgba(213,168,72,0.4)] flex items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#D5A848]/20 border border-[#D5A848] flex items-center justify-center text-[#F3D17A] shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#F3D17A]">
                      Interactive Measurement Studio
                    </span>
                    <h4 className="text-sm font-medium text-white">
                      Individual 2D Avatar Guidance
                    </h4>
                    <p className="text-[11px] text-neutral-300">
                      Input your bust, waist, shoulder & length metrics with live tape cues.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('make-for-me')}
                  className="hidden sm:inline-flex px-3.5 py-1.5 rounded bg-[#D5A848] text-[#070D24] text-xs font-bold hover:bg-[#F3D17A] transition-colors whitespace-nowrap shrink-0 shadow"
                >
                  Start Custom Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Pillars Banner */}
      <div className="border-t border-[rgba(213,168,72,0.2)] bg-[#0A1438]/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-sm font-serif text-white font-medium">Bespoke Millimeter Fit</div>
            <div className="text-xs text-neutral-300 mt-0.5">Cut to personal anatomical specs</div>
          </div>
          <div>
            <div className="text-sm font-serif text-white font-medium">Artisanal European Fabrics</div>
            <div className="text-xs text-neutral-300 mt-0.5">Mulberry Silk, Merino & Belgian Flax</div>
          </div>
          <div>
            <div className="text-sm font-serif text-white font-medium">Visual Avatar Guide</div>
            <div className="text-xs text-neutral-300 mt-0.5">Zero guesswork measuring assistant</div>
          </div>
          <div>
            <div className="text-sm font-serif text-white font-medium">Dedicated Master Tailor</div>
            <div className="text-xs text-neutral-300 mt-0.5">Direct phone & email fitting review</div>
          </div>
        </div>
      </div>
    </div>
  );
};
