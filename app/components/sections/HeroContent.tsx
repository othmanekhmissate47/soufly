'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const ROTATING_WORDS = ['DOMINATE', 'ELEVATE', 'CONQUER', 'PERFORM', 'EVOLVE'];

export function HeroContent() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20 pb-32">
      {/* Eyebrow */}
      <div
        className="eyebrow mb-6 opacity-0"
        style={{ animation: 'fadeUp 0.8s 0.3s ease forwards' }}
      >
        Morocco × The Future of Sport
      </div>

      {/* Main headline */}
      <h1
        className="opacity-0 mb-6"
        style={{ animation: 'fadeUp 0.9s 0.6s ease forwards' }}
      >
        <span
          className={`display-xl block transition-all duration-300 ${
            visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4'
          }`}
          style={{
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.85) 35%, #00e5ff 65%, #0066ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {ROTATING_WORDS[wordIdx]}
        </span>
        <span
          className="display-xl block"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          THE GAME
        </span>
      </h1>

      {/* Sub */}
      <p
        className="text-sm md:text-base text-white/40 tracking-widest uppercase max-w-sm mb-10 opacity-0"
        style={{ animation: 'fadeUp 0.8s 0.9s ease forwards' }}
      >
        Premium Sports Equipment & Fitness Gear
      </p>

      {/* CTAs */}
      <div
        className="flex flex-col sm:flex-row items-center gap-4 opacity-0"
        style={{ animation: 'fadeUp 0.8s 1.1s ease forwards' }}
      >
        <Link
          href="/shop"
          className="btn btn-primary px-10 py-4 text-[11px] no-underline"
        >
          Shop the Collection
        </Link>
        <Link
          href="/store"
          className="btn btn-ghost px-10 py-4 text-[11px] no-underline"
        >
          Enter 3D Store
        </Link>
      </div>

      {/* Stats strip */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-8 md:gap-16 opacity-0"
        style={{ animation: 'fadeUp 0.8s 1.5s ease forwards' }}
      >
        {[
          { value: '50K+', label: 'Athletes' },
          { value: '200+', label: 'Products' },
          { value: '4.9★', label: 'Rating' },
          { value: '🇲🇦', label: 'Made Here' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <div className="text-xl md:text-2xl font-black text-white">{stat.value}</div>
            <div className="text-[9px] tracking-widest uppercase text-white/30 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ animation: 'fadeUp 0.8s 2s ease forwards' }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent" style={{ animation: 'breathe 2s ease-in-out infinite' }} />
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
      </div>
    </div>
  );
}
