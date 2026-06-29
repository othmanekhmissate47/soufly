'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { searchProducts } from '@/lib/products';
import type { Product } from '@/lib/products';
import { useCartStore, useToastStore } from '@/lib/store';
import { debounce } from '@/lib/utils';

const QUICK_QUERIES = [
  { label: '⚽ Football Boots', query: 'football boots' },
  { label: '🥊 Gym Gloves',     query: 'gym gloves' },
  { label: '👟 Running Shoes',  query: 'running shoes' },
  { label: '💪 Resistance Bands', query: 'resistance bands' },
  { label: '🥤 Protein Shaker', query: 'protein shaker' },
  { label: '⚡ Recovery',       query: 'recovery' },
];

export function AISearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCartStore();
  const { show } = useToastStore();

  const doSearch = useCallback(
    debounce((q: string) => {
      setLoading(true);
      setTimeout(() => {
        setResults(searchProducts(q));
        setHasSearched(true);
        setLoading(false);
      }, 300);
    }, 150),
    []
  );

  const handleChange = (val: string) => {
    setQuery(val);
    if (val.trim().length >= 2) doSearch(val);
    else { setResults([]); setHasSearched(false); }
  };

  const handleQuick = (q: string) => {
    setQuery(q);
    doSearch(q);
    inputRef.current?.focus();
  };

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, product.sizes[0] || 'One Size', product.variants[0]?.color || 'Default');
    show(`✅ ${product.name} added to cart`);
  };

  return (
    <section className="py-24" style={{ background: 'linear-gradient(180deg, #000 0%, #030312 100%)' }}>
      <div className="section-container text-center">
        <p className="eyebrow mb-4">AI-Powered Search</p>
        <h2 className="display-md mb-4">
          Find Your{' '}
          <span className="text-gradient-blue">Perfect Gear</span>
        </h2>
        <p className="text-sm text-white/40 mb-10 max-w-md mx-auto">
          Describe what you need and our AI matches you with the right equipment instantly.
        </p>

        {/* Search input */}
        <div className="relative max-w-[660px] mx-auto mb-5">
          <div
            className="flex items-center gap-4 px-6 py-5 rounded-2xl border transition-all duration-300 focus-within:border-cyan-400/40 focus-within:shadow-[0_0_40px_rgba(0,229,255,0.1)]"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* AI indicator */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[9px] tracking-[0.2em] uppercase text-cyan-400 font-black">AI</span>
            </div>

            <input
              ref={inputRef}
              value={query}
              onChange={e => handleChange(e.target.value)}
              placeholder='Try "football boots for hard ground" or "gym recovery tools"…'
              className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
              onKeyDown={e => e.key === 'Enter' && query && doSearch(query)}
            />

            {loading && (
              <div className="flex-shrink-0">
                <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
              </div>
            )}

            <button
              onClick={() => query && doSearch(query)}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center hover:scale-110 hover:shadow-[0_0_20px_rgba(0,102,255,0.5)] transition-all duration-300"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
        </div>

        {/* Quick chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {QUICK_QUERIES.map(q => (
            <button
              key={q.query}
              onClick={() => handleQuick(q.query)}
              className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-[11px] text-white/50 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-400/[0.06] transition-all duration-200"
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="mt-4" style={{ animation: 'fadeUp 0.4s ease forwards' }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <p className="eyebrow">
                {results.length > 0
                  ? `${results.length} matches for "${query}"`
                  : `No results for "${query}"`}
              </p>
            </div>

            {results.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-white/[0.06] border border-white/[0.06]">
                {results.slice(0, 6).map(product => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="no-underline bg-[#030312] p-5 flex flex-col items-center text-center hover:bg-white/[0.04] transition-colors group"
                  >
                    <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 block">
                      {product.emoji}
                    </span>
                    <p className="text-xs font-bold text-white mb-1 truncate w-full">{product.name}</p>
                    <p className="text-[10px] text-cyan-400 font-black mb-2">{product.price.toLocaleString()} MAD</p>
                    <button
                      onClick={(e) => handleAdd(product, e)}
                      className="px-3 py-1.5 rounded-full bg-blue-600/20 border border-blue-600/30 text-[9px] tracking-widest uppercase text-blue-400 hover:bg-blue-600/40 hover:text-white transition-all"
                    >
                      + Cart
                    </button>
                  </Link>
                ))}
              </div>
            )}

            {results.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-white/30 text-sm mb-4">Try browsing by category instead</p>
                <Link href="/shop" className="btn btn-ghost px-6 py-3 text-[10px] no-underline">
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
