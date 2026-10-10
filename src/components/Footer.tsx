import React from 'react';
import { ActiveView } from '../types';
import { TwiceAsMuchLogo } from './TwiceAsMuchLogo';

interface FooterProps {
  onNavigate: (view: ActiveView) => void;
  brandName: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, brandName }) => {
  const [subscribed, setSubscribed] = React.useState(false);

  return (
    <footer className="bg-[#05091B] border-t border-[rgba(213,168,72,0.2)] text-neutral-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col with Shield Logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <TwiceAsMuchLogo size="md" />
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Maison de Couture & Bespoke Tailoring. Preserving the heritage of master patternmaking through digital measurement precision and sustainable made-to-order craft.
            </p>
            <div className="text-neutral-400 font-mono text-[11px] flex items-center gap-2">
              <span className="text-[#D5A848]">✦</span>
              <span>Paris · Milan · London · New York</span>
            </div>
          </div>

          {/* Nav Links Col */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-widest text-[#F3D17A] block font-semibold">
              Maison
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Homepage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors"
                >
                  Ready-to-Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('make-for-me')}
                  className="text-[#D5A848] hover:text-[#F3D17A] hover:underline transition-colors"
                >
                  Make For Me (Custom)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('accessories')}
                  className="hover:text-white transition-colors"
                >
                  Accessories & Timepieces
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Services Col */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-widest text-[#F3D17A] block font-semibold">
              Atelier Services
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-white transition-colors"
                >
                  Master Tailor Portal
                </button>
              </li>
              <li className="text-neutral-400">Fabric Swatch Orders</li>
              <li className="text-neutral-400">Private Fitting Salon</li>
              <li className="text-neutral-400">Garment Alterations</li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-widest text-[#F3D17A] block font-semibold">
              Atelier Gazette
            </span>
            <p className="text-neutral-400 text-xs">
              Receive seasonal lookbooks, fabric arrival notifications, and private trunk show invitations.
            </p>
            {subscribed ? (
              <div className="py-2.5 px-3 rounded bg-[#0D2054] border border-[#D5A848]/60 text-xs text-[#F3D17A] flex items-center gap-2">
                <span className="text-[#D5A848]">✦</span>
                <span>Thank you for subscribing to the TWICE AS MUCH Gazette.</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 rounded bg-[#091233] border border-[rgba(213,168,72,0.3)] text-white text-xs w-full focus:outline-none focus:border-[#D5A848]"
                />
                <button
                  type="button"
                  onClick={() => setSubscribed(true)}
                  className="px-4 py-2 rounded bg-[#D5A848] text-[#070D24] text-xs font-bold hover:bg-[#F3D17A]"
                >
                  Join
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-[rgba(213,168,72,0.15)] flex flex-col sm:flex-row items-center justify-between text-neutral-400 text-[11px] gap-4">
          <div>
            © {new Date().getFullYear()} {brandName || 'TWICE AS MUCH'}. All rights reserved. Handcrafted tailoring.
          </div>
          <div className="flex items-center gap-6">
            <span>Complimentary Global Insured Delivery</span>
            <span className="text-[#D5A848]">·</span>
            <span>Master Tailor Fitting Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
