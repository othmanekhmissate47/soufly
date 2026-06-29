'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const STATS = [
  { value: 50000, suffix: '+', label: 'Athletes Equipped' },
  { value: 200, suffix: '+', label: 'Premium Products' },
  { value: 4.9, suffix: '★', label: 'Average Rating' },
];

function useCountUp(target: number, trigger: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, trigger, duration]);
  return count;
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, triggered);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const display = value >= 1000
    ? (count / 1000).toFixed(0) + 'K'
    : value === 4.9
    ? count.toFixed(1)
    : Math.floor(count).toString();

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black text-gradient-blue mb-2">
        {display}{suffix}
      </div>
      <div className="text-[10px] tracking-[0.3em] uppercase text-white/30">{label}</div>
    </div>
  );
}

export function Manifesto() {
  return (
    <section
      className="py-32 text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000 0%, #020210 50%, #000 100%)' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="section-container relative z-10">
        <p className="eyebrow mb-6">Our Mission</p>

        <h2 className="display-lg max-w-4xl mx-auto mb-6">
          We Equip Athletes{' '}
          <br className="hidden md:block" />
          <span className="text-gradient-blue">To Break Every Limit</span>
        </h2>

        <p className="text-sm md:text-base text-white/40 leading-relaxed max-w-[560px] mx-auto mb-16">
          From the streets of Casablanca to the stadiums of the world — SOUFLY was built for those
          who refuse to settle for average. Premium gear, Moroccan soul, global standards.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 md:gap-16 max-w-lg mx-auto mb-16">
          {STATS.map(s => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/shop" className="btn btn-primary px-10 py-4 text-[11px] no-underline">
            Discover the Collection
          </Link>
          <Link href="/about" className="btn btn-ghost px-10 py-4 text-[11px] no-underline">
            Our Story
          </Link>
        </div>

        {/* Moroccan flag accent */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-white/20 text-xs tracking-widest">MADE IN MOROCCO 🇲🇦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>
    </section>
  );
}
