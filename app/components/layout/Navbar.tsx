'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore, useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { SearchOverlay } from '@/app/components/ui/SearchOverlay';

const NAV_LINKS = [
  { href: '/',       label: 'Home' },
  { href: '/shop',   label: 'Shop' },
  { href: '/store',  label: '3D Store' },
  { href: '/about',  label: 'Brand' },
];

export function Navbar() {
  const pathname = usePathname();
  const { openCart, totalItems } = useCartStore();
  const { navScrolled, setNavScrolled, searchOpen, setSearchOpen, mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const count = totalItems();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [setNavScrolled]);

  useEffect(() => { closeMobileMenu(); }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          navScrolled
            ? 'bg-black/90 backdrop-blur-2xl border-b border-white/[0.08]'
            : 'bg-gradient-to-b from-black/70 to-transparent'
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 no-underline">
            <span className="text-2xl font-black tracking-[0.3em] text-gradient select-none">
              SOUFLY
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-[11px] tracking-[0.25em] uppercase font-semibold transition-colors duration-300 no-underline',
                  pathname === link.href ? 'text-cyan-400' : 'text-white/50 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-300"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>

            <button
              onClick={openCart}
              className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-300 relative"
              aria-label="Cart"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-[9px] font-black flex items-center justify-center text-white">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            <Link href="/shop" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-[10px] tracking-[0.25em] uppercase font-black text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(0,102,255,0.5)] transition-all duration-300 no-underline">
              Shop Now
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-white/60"
              aria-label="Menu"
            >
              {mobileMenuOpen
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              }
            </button>
          </div>
        </div>

        <div className={cn('md:hidden overflow-hidden transition-all duration-500 bg-black/95 backdrop-blur-2xl', mobileMenuOpen ? 'max-h-64 border-t border-white/[0.08]' : 'max-h-0')}>
          <div className="px-6 py-6 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href}
                className={cn('py-3 px-4 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-200 no-underline',
                  pathname === link.href ? 'text-cyan-400 bg-cyan-400/[0.06]' : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}
