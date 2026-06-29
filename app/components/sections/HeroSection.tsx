'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const HeroBackground = dynamic(
  () => import('@/app/components/3d/HeroBackground').then(m => ({ default: m.HeroBackground })),
  { ssr: false }
);

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const els = document.querySelectorAll('[data-hero-animate]');
    els.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(24px)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateY(0)';
      }, 200 + i * 150);
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">
      <HeroBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none z-[1]" />
      <div className="relative z-10 text-center px-6 pt-20 pb-32">
        <p data-hero-animate className="eyebrow mb-6">Morocco × The Future of Sport</p>
        <h1 ref={titleRef} data-hero-animate className="display-xl mb-6 text-gradient">
          DOMINATE<br />THE GAME
        </h1>
        <p data-hero-animate className="text-sm text-white/40 tracking-widest uppercase max-w-sm mx-auto mb-10">
          Premium Sports Equipment & Fitness Gear
        </p>
        <div data-hero-animate className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/shop" className="btn btn-primary px-10 py-4 text-[11px] no-underline">
            Shop the Collection
          </Link>
          <Link href="/store" className="btn btn-ghost px-10 py-4 text-[11px] no-underline">
            Enter 3D Store
          </Link>
        </div>
        <div
          data-hero-animate
          className="mt-16 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent" style={{ animation: 'breathe 2s ease-in-out infinite' }} />
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
        </div>
      </div>
    </section>
  );
}
