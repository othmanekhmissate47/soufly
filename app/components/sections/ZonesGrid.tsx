'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

const ZONES = [
  {
    key: 'football',
    label: 'Football Zone',
    number: '01',
    emoji: '⚽',
    count: 47,
    gradient: 'from-[#000820] to-[#001060]',
    accentColor: '#0066ff',
    accentLabel: 'text-blue-400',
    tagline: 'Boots. Gear. Glory.',
    span: 'lg:col-span-2 lg:row-span-2',
    aspect: 'aspect-[4/3] lg:aspect-auto',
  },
  {
    key: 'running',
    label: 'Running Zone',
    number: '02',
    emoji: '👟',
    count: 32,
    gradient: 'from-[#001208] to-[#002d12]',
    accentColor: '#00ff88',
    accentLabel: 'text-emerald-400',
    tagline: 'Go further. Hit harder.',
    span: 'lg:col-span-1',
    aspect: 'aspect-square',
  },
  {
    key: 'fitness',
    label: 'Fitness Zone',
    number: '03',
    emoji: '🏋️',
    count: 64,
    gradient: 'from-[#1a0900] to-[#2d1400]',
    accentColor: '#ff6600',
    accentLabel: 'text-orange-400',
    tagline: 'Build. Push. Repeat.',
    span: 'lg:col-span-1',
    aspect: 'aspect-square',
  },
  {
    key: 'recovery',
    label: 'Recovery Zone',
    number: '04',
    emoji: '🧘',
    count: 28,
    gradient: 'from-[#0d0020] to-[#1e0040]',
    accentColor: '#c084fc',
    accentLabel: 'text-purple-400',
    tagline: 'Rest smart. Rise stronger.',
    span: 'lg:col-span-1',
    aspect: 'aspect-square',
  },
  {
    key: 'accessories',
    label: 'Accessories',
    number: '05',
    emoji: '🎒',
    count: 40,
    gradient: 'from-[#0a0a12] to-[#151528]',
    accentColor: '#00e5ff',
    accentLabel: 'text-cyan-400',
    tagline: 'Complete your kit.',
    span: 'lg:col-span-1',
    aspect: 'aspect-square',
  },
];

export function ZonesGrid() {
  return (
    <section className="py-24 px-0">
      <div className="section-container mb-12">
        <p className="eyebrow mb-4">Explore by Zone</p>
        <div className="flex items-end justify-between">
          <h2 className="display-md">
            Your World,{' '}
            <span className="text-gradient-blue">Your Sport</span>
          </h2>
          <Link href="/shop" className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors no-underline group">
            View All
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border-t border-b border-white/[0.06]" style={{ minHeight: '600px' }}>
        {ZONES.map((zone, idx) => (
          <Link
            key={zone.key}
            href={`/shop?cat=${zone.key}`}
            className={cn(
              'relative overflow-hidden group no-underline zone-card',
              zone.span,
              idx === 0 && 'sm:col-span-2 lg:col-span-2 lg:row-span-2'
            )}
            style={{ minHeight: idx === 0 ? 400 : 200 }}
          >
            {/* Bg gradient */}
            <div className={cn('absolute inset-0 bg-gradient-to-br', zone.gradient)} />

            {/* Grid texture */}
            <div className="absolute inset-0 opacity-30 grid-overlay" />

            {/* Floating emoji */}
            <div className="zone-bg absolute inset-0 flex items-center justify-center">
              <span
                className="select-none"
                style={{
                  fontSize: idx === 0 ? '160px' : '100px',
                  filter: 'drop-shadow(0 0 40px rgba(0,102,255,0.3))',
                  opacity: 0.18,
                }}
                role="img" aria-hidden="true"
              >
                {zone.emoji}
              </span>
            </div>

            {/* Glow spot */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle at 30% 70%, ${zone.accentColor}18 0%, transparent 60%)`,
              }}
            />

            {/* Hover border glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 1px ${zone.accentColor}30` }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              {/* Zone number */}
              <span className={cn('eyebrow', zone.accentLabel)}>
                Zone {zone.number}
              </span>

              <h3 className={cn(
                'font-black tracking-tight mt-2 mb-1 text-white',
                idx === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
              )}>
                {zone.label}
              </h3>

              <p className="text-xs text-white/40 mb-4">{zone.tagline}</p>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/30 tracking-widest">{zone.count} Products</span>
                <div className={cn(
                  'flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-black transition-all duration-300',
                  zone.accentLabel,
                  'group-hover:translate-x-1'
                )}>
                  Enter Zone
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
