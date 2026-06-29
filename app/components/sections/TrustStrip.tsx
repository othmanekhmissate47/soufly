'use client';

import { Truck, Shield, RotateCcw, Award } from 'lucide-react';
import { useInView } from '@/hooks/useScrollProgress';
import { cn } from '@/lib/utils';

const FEATURES = [
  {
    icon: Truck,
    label: 'Express Delivery',
    desc: '24–48h across Morocco',
    color: 'text-cyan-400',
  },
  {
    icon: Shield,
    label: 'Secure Payment',
    desc: '100% encrypted checkout',
    color: 'text-blue-400',
  },
  {
    icon: RotateCcw,
    label: 'Free Returns',
    desc: '30-day hassle-free policy',
    color: 'text-cyan-400',
  },
  {
    icon: Award,
    label: 'Premium Quality',
    desc: 'Pro-grade certified gear',
    color: 'text-blue-400',
  },
];

export function TrustStrip() {
  const { ref, inView } = useInView(0.2);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="border-y border-white/[0.06] grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06]"
    >
      {FEATURES.map((feature, i) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.label}
            className={cn(
              'flex flex-col items-center text-center py-8 px-6 hover:bg-white/[0.02] transition-all duration-500 group',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div
              className={cn(
                'w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300',
                feature.color
              )}
            >
              <Icon size={18} />
            </div>
            <p className="text-sm font-bold mb-1">{feature.label}</p>
            <p className="text-xs text-white/35">{feature.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
