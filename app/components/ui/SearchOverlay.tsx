'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { searchProducts } from '@/lib/products';
import type { Product } from '@/lib/products';
import { useCartStore, useToastStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const SUGGESTIONS = [
  'Football boots',
  'Gym gloves',
  'Running shoes',
  'Protein shaker',
  'Resistance bands',
  'Recovery tools',
];

interface SearchOverlayProps { onClose: () => void; }

export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCartStore();
  const { show } = useToastStore();

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (query.trim().length < 2) { setResults([]); return; }
    setResults(searchProducts(query));
  }, [query]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, product.sizes[0] || 'One Size', product.variants[0]?.color || 'Default');
    show(`✅ ${product.name} added to cart`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-[680px] bg-[#080812] border border-white/[0.10] rounded-2xl overflow-hidden shadow-2xl">
        {/* Input row */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-white/[0.06]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-cyan-400 flex-shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search for "football boots", "gym gloves"…'
            className="flex-1 bg-transparent text-base text-white placeholder-white/30 outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-white/30 hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
          <button onClick={onClose} className="text-[10px] tracking-widest uppercase text-white/30 hover:text-white transition-colors border border-white/[0.08] rounded px-2 py-1">
            ESC
          </button>
        </div>

        {/* Suggestions (no query) */}
        {!query && (
          <div className="px-6 py-5">
            <p className="eyebrow mb-4">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-white/50 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-400/[0.06] transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && results.length === 0 && (
          <div className="px-6 py-8 text-center text-white/30 text-sm">
            No products found for &quot;{query}&quot;
          </div>
        )}

        {results.length > 0 && (
          <div className="max-h-[420px] overflow-y-auto">
            <div className="px-6 pt-4 pb-2">
              <p className="eyebrow">
                {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
              </p>
            </div>
            {results.map(product => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.03] transition-colors border-b border-white/[0.04] last:border-0 no-underline group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center text-2xl flex-shrink-0">
                  {product.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{product.categoryLabel}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-black text-white">{product.price.toLocaleString()} MAD</p>
                  {product.oldPrice && (
                    <p className="text-xs text-white/30 line-through">{product.oldPrice.toLocaleString()} MAD</p>
                  )}
                </div>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="ml-2 px-3 py-2 rounded-lg bg-blue-600/20 border border-blue-600/30 text-[10px] tracking-widest uppercase text-blue-400 hover:bg-blue-600/40 hover:text-white transition-all flex-shrink-0"
                >
                  + Cart
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
