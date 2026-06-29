'use client';

import { Suspense } from 'react';
import { StoreScene } from '@/app/components/3d/StoreScene';
import { Footer } from '@/app/components/layout/Footer';
import Link from 'next/link';

function StoreHeroLabel() {
  return (
    <div className="absolute top-24 left-0 right-0 z-10 flex flex-col items-center pointer-events-none">
      <p className="eyebrow mb-3 text-glow-cyan">Interactive 3D Experience</p>
      <h1
        className="text-3xl md:text-5xl font-black tracking-tight text-center"
        style={{
          background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 40%, #00e5ff 70%, #0066ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        SOUFLY Showroom
      </h1>
      <p className="mt-3 text-xs text-white/30 tracking-widest">
        The future of sports retail — now
      </p>
    </div>
  );
}

export default function StorePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* ── Full-viewport 3D Scene ── */}
      <section className="relative flex-1" style={{ minHeight: '100vh' }}>
        {/* Background glow accents */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse at 20% 50%, rgba(0,102,255,0.06) 0%, transparent 50%),' +
              'radial-gradient(ellipse at 80% 50%, rgba(0,229,255,0.04) 0%, transparent 50%)',
          }}
        />

        <StoreHeroLabel />

        {/* 3D Canvas */}
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-[#000510]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
                <p className="text-xs text-white/30 tracking-widest uppercase">Loading Showroom…</p>
              </div>
            </div>
          }
        >
          <div className="absolute inset-0">
            <StoreScene />
          </div>
        </Suspense>

        {/* Bottom gradient blend into sections below */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      </section>

      {/* ── Zones quick-links below the 3D scene ── */}
      <section className="py-20 bg-black relative z-10">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Browse Zones</p>
            <h2 className="display-md">
              Shop by <span className="text-gradient-blue">Category</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.06] border border-white/[0.06]">
            {[
              { key: 'football',    emoji: '⚽', label: 'Football',    color: '#0066ff', count: 47 },
              { key: 'running',     emoji: '👟', label: 'Running',     color: '#00ff88', count: 32 },
              { key: 'fitness',     emoji: '🏋️', label: 'Fitness',     color: '#ff4500', count: 64 },
              { key: 'recovery',    emoji: '🧘', label: 'Recovery',    color: '#c084fc', count: 28 },
              { key: 'accessories', emoji: '🎒', label: 'Accessories', color: '#ffd700', count: 40 },
              { key: 'all',         emoji: '🏆', label: 'All Gear',    color: '#00e5ff', count: 211 },
            ].map(zone => (
              <Link
                key={zone.key}
                href={`/shop?cat=${zone.key}`}
                className="group flex flex-col items-center justify-center py-10 px-4 bg-[#040408] hover:bg-white/[0.03] transition-all duration-300 no-underline text-center cursor-pointer"
              >
                <span
                  className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300 block"
                  style={{ filter: `drop-shadow(0 0 12px ${zone.color}60)` }}
                >
                  {zone.emoji}
                </span>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase font-black mb-1 group-hover:text-white transition-colors"
                  style={{ color: zone.color }}
                >
                  {zone.label}
                </p>
                <p className="text-[9px] text-white/20">{zone.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience features ── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #000 0%, #020210 100%)' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)' }}
        />

        <div className="section-container relative z-10">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">The Experience</p>
            <h2 className="display-md max-w-2xl mx-auto">
              Sports Shopping,{' '}
              <span className="text-gradient-blue">Reimagined</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
            {[
              {
                icon: '🎮',
                title: '3D Navigation',
                desc: 'Drag to rotate the entire store. Zoom into any section. Explore shelves like you are physically there.',
                color: '#0066ff',
              },
              {
                icon: '🔮',
                title: 'Holographic Displays',
                desc: 'Every product zone has its own atmosphere, lighting, and themed display system.',
                color: '#00e5ff',
              },
              {
                icon: '⚡',
                title: 'Real-time Interaction',
                desc: 'Click any product in the 3D scene to see instant details, specs, and add to your cart.',
                color: '#c084fc',
              },
            ].map(feat => (
              <div
                key={feat.title}
                className="group p-10 bg-[#040408] hover:bg-white/[0.02] transition-all duration-400 relative overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 50%, ${feat.color}08 0%, transparent 60%)`,
                  }}
                />

                <div
                  className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block"
                  style={{ filter: `drop-shadow(0 0 16px ${feat.color}60)` }}
                >
                  {feat.icon}
                </div>
                <h3 className="text-lg font-black tracking-tight mb-3">{feat.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 text-center bg-black">
        <div className="section-container">
          <h2 className="display-md mb-6">
            Ready to <span className="text-gradient-blue">Gear Up?</span>
          </h2>
          <p className="text-sm text-white/40 mb-8 max-w-md mx-auto">
            Browse our full collection and find exactly what you need to perform at your best.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop" className="btn btn-primary px-10 py-4 text-[11px] no-underline">
              Shop All Products
            </Link>
            <Link href="/" className="btn btn-ghost px-10 py-4 text-[11px] no-underline">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
