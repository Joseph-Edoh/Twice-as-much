import React, { useState } from 'react';
import { ActiveView } from '../types';
import { TwiceAsMuchLogo } from './TwiceAsMuchLogo';

interface NavbarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  cartCount: number;
  onOpenCart: () => void;
  brandName: string;
  brandLogoUrl: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  cartCount,
  onOpenCart,
  brandName,
  brandLogoUrl,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#070D24]/95 backdrop-blur-md border-b border-[rgba(213,168,72,0.2)] transition-colors shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-22">
          {/* Zone 1: Brand Wordmark & Shield Logo Badge */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left focus:outline-none whitespace-nowrap shrink-0 group py-1"
          >
            {brandLogoUrl ? (
              <img
                src={brandLogoUrl}
                alt={brandName}
                className="h-12 w-auto object-contain max-w-[160px]"
              />
            ) : (
              <div className="flex items-center gap-3">
                {/* Official TWICE AS MUCH Shield Logo */}
                <TwiceAsMuchLogo size="md" />
              </div>
            )}
          </button>

          {/* Zone 2: Navigation Links (single line, clean typography) */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-mono text-neutral-300">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-[#D5A848] transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeView === 'home'
                  ? 'text-[#D5A848] border-b border-[#D5A848]'
                  : 'text-neutral-300'
              }`}
            >
              Maison
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className={`hover:text-[#D5A848] transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeView === 'catalog'
                  ? 'text-[#D5A848] border-b border-[#D5A848]'
                  : 'text-neutral-300'
              }`}
            >
              Ready-to-Wear
            </button>
            <button
              onClick={() => onNavigate('make-for-me')}
              className={`hover:text-[#D5A848] transition-colors whitespace-nowrap shrink-0 pb-1 flex items-center gap-2 ${
                activeView === 'make-for-me'
                  ? 'text-[#D5A848] border-b border-[#D5A848] font-semibold'
                  : 'text-[#D5A848]'
              }`}
            >
              <span>Make For Me</span>
              <span className="text-[9px] uppercase tracking-normal bg-[#D5A848]/20 text-[#F5D588] border border-[#D5A848]/40 px-1.5 py-0.5 rounded font-mono">
                Custom Studio
              </span>
            </button>
            <button
              onClick={() => onNavigate('accessories')}
              className={`hover:text-[#D5A848] transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeView === 'accessories'
                  ? 'text-[#D5A848] border-b border-[#D5A848]'
                  : 'text-neutral-300'
              }`}
            >
              Accessories
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeView === 'admin'
                  ? 'text-white border-b border-white font-semibold'
                  : 'text-neutral-400'
              }`}
            >
              Tailor Studio
            </button>
          </nav>

          {/* Zone 3: Primary Action & Shopping Bag */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onNavigate('make-for-me')}
              className="hidden lg:inline-flex px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#070D24] bg-gradient-to-r from-[#D5A848] to-[#F5D588] rounded-lg hover:brightness-110 transition-all whitespace-nowrap shrink-0 shadow-md shadow-[#D5A848]/20"
            >
              Custom Tailor
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-neutral-200 hover:text-white transition-colors rounded-lg bg-[#0E1A4A] border border-[rgba(213,168,72,0.3)] shadow-inner"
              aria-label="Shopping Bag"
            >
              <svg className="w-5 h-5 text-[#F5D588]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#D5A848] text-[#070D24] text-[10px] font-bold font-mono flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[rgba(213,168,72,0.2)] space-y-3 font-mono text-xs uppercase tracking-wider animate-in fade-in">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#D5A848]"
            >
              Maison Home
            </button>
            <button
              onClick={() => {
                onNavigate('catalog');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#D5A848]"
            >
              Ready-to-Wear Catalog
            </button>
            <button
              onClick={() => {
                onNavigate('make-for-me');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-[#D5A848] font-semibold"
            >
              "Make For Me" Custom Studio
            </button>
            <button
              onClick={() => {
                onNavigate('accessories');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#D5A848]"
            >
              Accessories (Watches & Shoes)
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-neutral-400 hover:text-white"
            >
              Tailor Studio / Admin
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
