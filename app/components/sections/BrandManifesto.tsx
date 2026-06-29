'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useScrollProgress';
import { cn } from '@/lib/utils';

const STATS = [
  { value: '50K+',  label: 'Athletes Equipped' },
  { value: '200+',  label: 'Premium Products' },
  { value: '4.8',   label: 'Average Rating' },
  { value: '#1',    label: 'Morocco Sports Brand' },
];

export function BrandManifesto() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000 0%, #030312 50%, #000 100%)',
      }}
    >
      {/* BG glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,102,255,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className={cn(
              'eyebrow mb-6 transition-all duration-700',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            Our Mission
          </p>

          <h2
            className={cn(
              'display-lg mb-8 transition-all duration-700 delay-100',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            We Equip Athletes<br />
            <span className="text-gradient-blue">To Break Limits</span>
          </h2>

          <p
            className={cn(
              'text-lg text-white/45 leading-relaxed mb-12 max-w-xl mx-auto transition-all duration-700 delay-200',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            From the streets of Casablanca to the stadiums of the world — SOUFLY was
            built for those who refuse to settle for average. Premium gear. Moroccan soul.
          </p>

          {/* Stats */}
          <div
            className={cn(
              'grid grid-cols-2 lg:grid-cols-4 gap-0.5 mb-12 transition-all duration-700 delay-300',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            {STATS.map(stat => (
              <div
                key={stat.label}
                className="py-8 px-4 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/20 transition-all duration-300 group"
              >
                <div
                  className="text-3xl lg:text-4xl font-black mb-2 group-hover:scale-105 transition-transform duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #fff 0%, #00e5ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-white/35 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          <div
            className={cn(
              'flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <Link href="/shop" className="btn btn-primary py-4 px-10">
              Discover the Collection
            </Link>
            <Link href="/brand" className="btn btn-ghost py-4 px-10 flex items-center gap-2">
              Our Story <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
