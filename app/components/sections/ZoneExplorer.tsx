'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useInView } from '@/hooks/useScrollProgress';
import { cn } from '@/lib/utils';

const ZONES = [
  {
    key: 'football',
    label: 'Football Zone',
    description: 'Boots, balls, training gear — everything to command the pitch.',
    count: 47,
    emoji: '⚽',
    gradient: 'from-blue-900/80 to-blue-950/90',
    accent: 'text-blue-400',
    glow: 'rgba(0,102,255,0.15)',
    span: 'lg:col-span-2',
  },
  {
    key: 'running',
    label: 'Running Zone',
    description: 'Shoes and gear engineered for every stride.',
    count: 32,
    emoji: '👟',
    gradient: 'from-emerald-900/80 to-emerald-950/90',
    accent: 'text-emerald-400',
    glow: 'rgba(0,255,136,0.15)',
    span: '',
  },
  {
    key: 'fitness',
    label: 'Fitness Zone',
    description: 'Build. Push. Repeat. Equipment for serious training.',
    count: 64,
    emoji: '🏋️',
    gradient: 'from-orange-900/80 to-orange-950/90',
    accent: 'text-orange-400',
    glow: 'rgba(255,102,0,0.15)',
    span: '',
  },
  {
    key: 'recovery',
    label: 'Recovery Zone',
    description: 'Rest smart. Tools for faster recovery.',
    count: 28,
    emoji: '🧘',
    gradient: 'from-purple-900/80 to-purple-950/90',
    accent: 'text-purple-400',
    glow: 'rgba(192,132,252,0.15)',
    span: '',
  },
  {
    key: 'accessories',
    label: 'Accessories',
    description: 'Complete your kit with premium accessories.',
    count: 40,
    emoji: '🎒',
    gradient: 'from-cyan-900/80 to-cyan-950/90',
    accent: 'text-cyan-400',
    glow: 'rgba(0,229,255,0.15)',
    span: '',
  },
];

export function ZoneExplorer() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24"
    >
      <div className="section-container mb-12">
        <p className="eyebrow mb-4">Explore by Zone</p>
        <div className="flex items-end justify-between">
          <h2 className="display-md">
            Your World, <span className="text-gradient-blue">Your Sport</span>
          </h2>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors no-underline group"
          >
            View All
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border-t border-b border-white/[0.06]">
        {ZONES.map((zone, idx) => (
          <Link
            key={zone.key}
            href={`/shop?cat=${zone.key}`}
            className={cn(
              'relative overflow-hidden group no-underline zone-card',
              zone.span,
              idx === 0 ? 'min-h-[320px]' : 'min-h-[220px]'
            )}
          >
            <div className={cn('absolute inset-0 bg-gradient-to-br', zone.gradient)} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(circle at 30% 70%, ${zone.glow} 0%, transparent 60%)` }}
            />

            <div className="zone-bg absolute inset-0 flex items-center justify-center">
              <span
                className="select-none"
                style={{
                  fontSize: idx === 0 ? '140px' : '90px',
                  opacity: 0.15,
                  filter: 'drop-shadow(0 0 30px rgba(0,102,255,0.3))',
                }}
                aria-hidden="true"
              >
                {zone.emoji}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className={cn('eyebrow mb-2', zone.accent)}>Zone {String(idx + 1).padStart(2, '0')}</p>
              <h3 className={cn('font-black tracking-tight mb-1', idx === 0 ? 'text-2xl md:text-3xl' : 'text-xl')}>
                {zone.label}
              </h3>
              <p className="text-xs text-white/40 mb-4">{zone.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/30 tracking-widest">{zone.count} Products</span>
                <span className={cn('text-[10px] tracking-[0.2em] uppercase font-black transition-transform duration-300 group-hover:translate-x-1', zone.accent)}>
                  Enter Zone →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
