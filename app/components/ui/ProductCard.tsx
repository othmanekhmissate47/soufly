'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { useCartStore, useWishlistStore, useToastStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

const BADGE_STYLES: Record<string, string> = {
  new:       'bg-blue-600 text-white',
  hot:       'bg-gradient-to-r from-orange-500 to-red-500 text-white',
  sale:      'bg-white/10 border border-white/20 text-white',
  exclusive: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
};

const BADGE_LABELS: Record<string, string> = {
  new:       'New',
  hot:       '🔥 Hot',
  sale:      'Sale',
  exclusive: '✦ Exclusive',
};

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toggle, has } = useWishlistStore();
  const { show } = useToastStore();
  const isWishlisted = has(product.id);

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0] || 'One Size', product.variants[0]?.color || 'Default');
    show(`✅ ${product.name} added to cart`);
  }, [product, addItem, show]);

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    show(has(product.id)
      ? `💔 Removed from wishlist`
      : `❤️ Added to wishlist`
    );
  }, [product.id, toggle, has, show]);

  return (
    <Link href={`/product/${product.slug}`} className="no-underline block" tabIndex={0}>
      <article className={cn('product-card rounded-none', className)}>
        {/* Image area */}
        <div className="relative overflow-hidden aspect-square">
          {/* Gradient bg for emoji */}
          <div
            className="product-image w-full h-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(0,102,255,0.12) 0%, rgba(0,229,255,0.05) 50%, transparent 80%)',
            }}
          >
            <span className="text-[88px] leading-none select-none drop-shadow-2xl" role="img" aria-label={product.name}>
              {product.emoji}
            </span>
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Badge */}
          {product.badge && (
            <span className={cn('absolute top-3.5 left-3.5 text-[9px] tracking-[0.2em] uppercase font-black px-2.5 py-1 rounded-full', BADGE_STYLES[product.badge])}>
              {BADGE_LABELS[product.badge]}
            </span>
          )}

          {/* Discount bubble */}
          {discount > 0 && (
            <span className="absolute top-3.5 right-12 text-[9px] tracking-[0.1em] font-black px-2 py-1 rounded-full bg-red-500/90 text-white">
              -{discount}%
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={cn(
              'absolute top-3.5 right-3.5 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300',
              isWishlisted
                ? 'bg-red-500/20 border-red-400/40 text-red-400'
                : 'bg-black/40 border-white/[0.12] text-white/50 hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-400'
            )}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="eyebrow text-[9px] mb-1.5">{product.categoryLabel}</p>
          <h3 className="text-[15px] font-black tracking-tight leading-tight mb-1">{product.name}</h3>
          <p className="text-xs text-white/40 mb-3 line-clamp-1">{product.tagline}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-white/30">{product.rating} ({product.reviewCount})</span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-lg font-black text-white">{product.price.toLocaleString()} MAD</span>
              {product.oldPrice && (
                <span className="ml-2 text-xs text-white/30 line-through">{product.oldPrice.toLocaleString()}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-shrink-0 px-3.5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-[9px] tracking-[0.2em] uppercase font-black text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(0,102,255,0.5)] transition-all duration-300 active:scale-95"
            >
              + Cart
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
