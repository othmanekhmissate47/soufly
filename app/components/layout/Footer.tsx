'use client';

import Link from 'next/link';

const SHOP_LINKS = [
  { label: 'Football Zone', href: '/shop?cat=football' },
  { label: 'Running Zone',  href: '/shop?cat=running' },
  { label: 'Fitness Zone',  href: '/shop?cat=fitness' },
  { label: 'Recovery Zone', href: '/shop?cat=recovery' },
  { label: 'Accessories',   href: '/shop?cat=accessories' },
];

const BRAND_LINKS = [
  { label: 'Our Story', href: '/about' },
  { label: 'Athletes',  href: '/about' },
  { label: 'Careers',   href: '/about' },
  { label: 'Press',     href: '/about' },
];

const SUPPORT_LINKS = [
  { label: 'Contact Us',    href: '#' },
  { label: 'Shipping Info', href: '#' },
  { label: 'Returns',       href: '#' },
  { label: 'Size Guide',    href: '#' },
];

const SOCIAL = ['📸', '🎵', '▶️', '🐦'];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/[0.06]">
        <div>
          <Link href="/" className="no-underline">
            <span className="text-xl font-black tracking-[0.35em] text-gradient block mb-4">SOUFLY</span>
          </Link>
          <p className="text-sm text-white/35 leading-relaxed mb-6 max-w-[240px]">
            Premium sports equipment & fitness accessories for the Moroccan athlete of tomorrow.
          </p>
          <div className="flex gap-2">
            {SOCIAL.map((icon, i) => (
              <button key={i} className="w-9 h-9 rounded-full border border-white/[0.08] bg-white/[0.03] text-sm hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-300">
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Shop</h4>
          <ul className="space-y-3">
            {SHOP_LINKS.map(l => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-white/35 hover:text-white transition-colors duration-200 no-underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Brand</h4>
          <ul className="space-y-3">
            {BRAND_LINKS.map(l => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-white/35 hover:text-white transition-colors duration-200 no-underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Support</h4>
          <ul className="space-y-3">
            {SUPPORT_LINKS.map(l => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-white/35 hover:text-white transition-colors duration-200 no-underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/20">© {new Date().getFullYear()} SOUFLY. All rights reserved. Made with ❤️ in Morocco 🇲🇦</p>
        <div className="flex gap-5">
          {['Privacy', 'Terms', 'Cookies'].map(t => (
            <a key={t} href="#" className="text-xs text-white/20 hover:text-white/50 transition-colors no-underline">{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
