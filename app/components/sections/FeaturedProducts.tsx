'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { FEATURED_PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/app/components/ui/ProductCard';

const TABS = [
  { key: 'all',      label: 'All' },
  { key: 'new',      label: 'New Arrivals' },
  { key: 'football', label: 'Football' },
  { key: 'fitness',  label: 'Fitness' },
  { key: 'running',  label: 'Running' },
];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = FEATURED_PRODUCTS.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'new') return p.badge === 'new' || p.badge === 'hot';
    return p.category === activeTab;
  }).slice(0, 8);

  return (
    <section className="py-24">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow mb-4">Best Sellers</p>
            <h2 className="display-md">
              Elite Collection{' '}
              <span className="text-gradient-blue">2025</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors no-underline group"
          >
            View All Products
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Tabs */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-2"
        >
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-black transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-[0_0_20px_rgba(0,102,255,0.3)]'
                  : 'border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06]">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="md:hidden mt-8 text-center">
          <Link href="/shop" className="btn btn-ghost px-8 py-3.5 text-[10px] no-underline">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
