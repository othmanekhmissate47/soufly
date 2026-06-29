'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES } from '@/lib/products';
import type { ProductCategory } from '@/lib/products';
import { ProductCard } from '@/app/components/ui/ProductCard';
import { Footer } from '@/app/components/layout/Footer';
import { cn } from '@/lib/utils';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'default',    label: 'Featured' },
  { key: 'newest',     label: 'New First' },
  { key: 'price-asc',  label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'rating',     label: 'Top Rated' },
];

function ShopContent() {
  const params = useSearchParams();
  const catParam = params.get('cat') || 'all';

  const [activeCategory, setActiveCategory] = useState<string>(catParam);
  const [sort, setSort] = useState<SortKey>('default');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setActiveCategory(params.get('cat') || 'all');
  }, [params]);

  const filtered = PRODUCTS
    .filter(p => {
      const catMatch = activeCategory === 'all' || p.category === activeCategory;
      const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.includes(search.toLowerCase()));
      return catMatch && searchMatch;
    })
    .sort((a, b) => {
      switch (sort) {
        case 'price-asc':  return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating':     return b.rating - a.rating;
        case 'newest':     return (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0);
        default:           return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-16 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="eyebrow mb-4">SOUFLY Collection</p>
          <h1 className="display-lg mb-4">
            The Full <span className="text-gradient-blue">Arsenal</span>
          </h1>
          <p className="text-sm text-white/40">
            {PRODUCTS.length} premium products. Zero compromises.
          </p>
        </div>
      </section>

      {/* Controls row */}
      <div className="sticky top-[72px] z-30 bg-black/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-center gap-3 py-4">
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={cn(
                    'flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-black transition-all duration-300',
                    activeCategory === cat.key
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white'
                      : 'border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white hover:border-white/20'
                  )}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                  <span className={cn(
                    'text-[8px] px-1.5 py-0.5 rounded-full',
                    activeCategory === cat.key ? 'bg-white/20' : 'bg-white/[0.06]'
                  )}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search + sort */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="pl-8 pr-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-white/25 outline-none focus:border-cyan-400/40 transition-colors w-36"
                />
              </div>

              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortKey)}
                className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/60 outline-none cursor-pointer focus:border-cyan-400/40 transition-colors"
                style={{ background: '#0a0a14' }}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.key} value={o.key}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="section-container pt-6 pb-2">
        <p className="text-xs text-white/30">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          {activeCategory !== 'all' && ` in ${CATEGORIES.find(c => c.key === activeCategory)?.label}`}
        </p>
      </div>

      {/* Grid */}
      <div className="section-container pb-24">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <div className="text-6xl mb-4 opacity-20">🔍</div>
            <p className="text-white/30 text-sm">No products match your filters.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearch(''); }}
              className="mt-4 btn btn-ghost px-6 py-3 text-[10px]"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06]">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
