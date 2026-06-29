'use client';

const FEATURES = [
  {
    icon: '🚀',
    title: 'Fast Delivery',
    desc: '24–48h across Morocco',
    glow: 'rgba(0,102,255,0.08)',
  },
  {
    icon: '🔒',
    title: 'Secure Payment',
    desc: '100% encrypted checkout',
    glow: 'rgba(0,229,255,0.08)',
  },
  {
    icon: '↩️',
    title: 'Free Returns',
    desc: '30-day hassle-free policy',
    glow: 'rgba(0,102,255,0.08)',
  },
  {
    icon: '💎',
    title: 'Premium Quality',
    desc: 'Pro-grade equipment',
    glow: 'rgba(0,229,255,0.08)',
  },
];

export function FeatureStrip() {
  return (
    <div className="border-t border-b border-white/[0.06]">
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06]">
        {FEATURES.map(f => (
          <div
            key={f.title}
            className="group px-6 py-8 md:py-10 text-center hover:bg-white/[0.02] transition-all duration-400 cursor-default"
            style={{ '--glow': f.glow } as React.CSSProperties}
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {f.icon}
            </div>
            <div className="text-sm font-black tracking-tight mb-1">{f.title}</div>
            <div className="text-xs text-white/30">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
