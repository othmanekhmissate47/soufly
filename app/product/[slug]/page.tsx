'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, PRODUCTS } from '@/lib/products';
import type { Product } from '@/lib/products';
import { useCartStore, useWishlistStore, useToastStore } from '@/lib/store';
import { ProductCard } from '@/app/components/ui/ProductCard';
import { cn } from '@/lib/utils';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [mainEmoji, setMainEmoji] = useState(0);

  const { addItem, openCart } = useCartStore();
  const { toggle, has } = useWishlistStore();
  const { show } = useToastStore();

  useEffect(() => {
    if (!product) return;
    setSelectedSize(product.sizes[0] || 'One Size');
    setSelectedColor(product.variants[0]?.color || 'Default');
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="text-6xl opacity-20">🔍</div>
        <p className="text-white/40">Product not found.</p>
        <Link href="/shop" className="btn btn-primary text-[10px] px-8 py-3 no-underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const isWishlisted = has(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) { show('Please select a size', 'error'); return; }
    addItem(product, selectedSize, selectedColor, qty);
    show(`✅ ${product.name} added to cart`);
    openCart();
  };

  const related = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <div className="pt-28 pb-4 section-container">
        <nav className="flex items-center gap-2 text-xs text-white/30">
          <Link href="/" className="hover:text-white transition-colors no-underline">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white transition-colors no-underline">Shop</Link>
          <span>/</span>
          <Link href={`/shop?cat=${product.category}`} className="hover:text-white transition-colors no-underline">{product.categoryLabel}</Link>
          <span>/</span>
          <span className="text-white/60">{product.name}</span>
        </nav>
      </div>

      {/* Main layout */}
      <div className="section-container pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Gallery */}
          <div className="lg:sticky lg:top-28">
            {/* Main image */}
            <div
              className="relative aspect-square rounded-2xl overflow-hidden mb-3 border border-white/[0.06] group"
              style={{ background: 'radial-gradient(circle at 40% 40%, rgba(0,102,255,0.12) 0%, rgba(0,229,255,0.04) 50%, rgba(0,0,0,0.95) 100%)' }}
            >
              {/* Rotating holo ring */}
              <div
                className="absolute inset-0 rounded-full scale-75 opacity-20 pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(0,102,255,0.4), rgba(0,229,255,0.4), rgba(0,102,255,0.4))',
                  borderRadius: '50%',
                  animation: 'rotateSlow 8s linear infinite',
                  filter: 'blur(20px)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[160px] select-none leading-none"
                  style={{
                    filter: 'drop-shadow(0 0 60px rgba(0,102,255,0.4)) drop-shadow(0 0 120px rgba(0,229,255,0.2))',
                    animation: 'float 4s ease-in-out infinite',
                  }}
                  role="img"
                  aria-label={product.name}
                >
                  {product.emoji}
                </span>
              </div>

              {/* Badge */}
              {product.badge && (
                <div className={cn(
                  'absolute top-4 left-4 text-[9px] tracking-[0.2em] uppercase font-black px-3 py-1.5 rounded-full',
                  product.badge === 'new' && 'bg-blue-600 text-white',
                  product.badge === 'hot' && 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
                  product.badge === 'sale' && 'bg-white/10 border border-white/20 text-white',
                )}>
                  {product.badge === 'hot' ? '🔥 Hot' : product.badge === 'new' ? 'New' : 'Sale'}
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-[9px] tracking-wider font-black px-2.5 py-1 rounded-full">
                  -{discount}%
                </div>
              )}

              {/* Scan line effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-30">
                <div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                  style={{ animation: 'scan 4s linear infinite' }}
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map(i => (
                <button
                  key={i}
                  onClick={() => setMainEmoji(i)}
                  className={cn(
                    'aspect-square rounded-xl border flex items-center justify-center text-3xl transition-all duration-200',
                    mainEmoji === i
                      ? 'border-cyan-400/60 bg-cyan-400/[0.06]'
                      : 'border-white/[0.06] bg-white/[0.03] hover:border-white/20'
                  )}
                >
                  {product.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="pt-2">
            <p className="eyebrow mb-3">{product.categoryLabel}</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-3">
              {product.name}
            </h1>
            <p className="text-base text-white/40 mb-5">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'} stroke="#fbbf24" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm font-bold text-white">{product.rating}</span>
              <span className="text-sm text-white/30">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-white/[0.06]">
              <span
                className="text-4xl font-black"
                style={{ background: 'linear-gradient(135deg,#fff,#00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                {product.price.toLocaleString()} MAD
              </span>
              {product.oldPrice && (
                <span className="text-xl text-white/25 line-through">{product.oldPrice.toLocaleString()} MAD</span>
              )}
              {discount > 0 && (
                <span className="text-sm font-black text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Size selector */}
            {product.sizes.length > 1 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold">Size</p>
                  <button className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors tracking-wider uppercase">
                    Size Guide →
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'min-w-[48px] h-11 px-3 rounded-xl border text-sm font-bold transition-all duration-200',
                        selectedSize === size
                          ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-400'
                          : 'border-white/[0.08] bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector */}
            {product.variants.length > 1 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold">
                    Color: <span className="text-white">{selectedColor}</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  {product.variants.map(variant => (
                    <button
                      key={variant.color}
                      onClick={() => setSelectedColor(variant.color)}
                      title={variant.color}
                      className={cn(
                        'w-9 h-9 rounded-full transition-all duration-200',
                        selectedColor === variant.color
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                          : 'hover:scale-110'
                      )}
                      style={{ background: variant.colorHex, border: variant.colorHex === '#f5f5f5' ? '1px solid rgba(255,255,255,0.2)' : 'none' }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Qty + actions */}
            <div className="flex items-center gap-3 mb-4">
              {/* Qty stepper */}
              <div className="flex items-center border border-white/[0.10] rounded-full overflow-hidden">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-11 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] transition-all font-bold text-lg"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-black">{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(10, q + 1))}
                  className="w-11 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] transition-all font-bold text-lg"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-[11px] tracking-[0.25em] uppercase font-black text-white hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,102,255,0.5)] transition-all duration-300 active:scale-95"
              >
                Add to Cart — {(product.price * qty).toLocaleString()} MAD
              </button>

              {/* Wishlist */}
              <button
                onClick={() => {
                  toggle(product.id);
                  show(isWishlisted ? '💔 Removed from wishlist' : '❤️ Added to wishlist');
                }}
                className={cn(
                  'w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300',
                  isWishlisted
                    ? 'border-red-400/40 bg-red-500/10 text-red-400'
                    : 'border-white/[0.10] bg-white/[0.03] text-white/40 hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-400'
                )}
                aria-label="Wishlist"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Feature chips */}
            <div className="grid grid-cols-2 gap-2 mt-6 mb-8">
              {product.features.map(feat => (
                <div key={feat} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-white/60">
                  <span className="text-cyan-400 font-bold">✓</span>
                  {feat}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-t border-white/[0.06] pt-8">
              <div className="flex gap-1 mb-6 border-b border-white/[0.06]">
                {(['description', 'specs', 'reviews'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'px-5 pb-3.5 text-[10px] tracking-[0.2em] uppercase font-black transition-all duration-200 border-b-2 -mb-px capitalize',
                      activeTab === tab
                        ? 'border-cyan-400 text-cyan-400'
                        : 'border-transparent text-white/30 hover:text-white/60'
                    )}
                  >
                    {tab} {tab === 'reviews' && `(${product.reviewCount})`}
                  </button>
                ))}
              </div>

              {/* Description */}
              {activeTab === 'description' && (
                <div style={{ animation: 'fadeUp 0.3s ease forwards' }}>
                  <p className="text-sm text-white/60 leading-relaxed">{product.longDescription}</p>
                </div>
              )}

              {/* Specs */}
              {activeTab === 'specs' && (
                <div className="space-y-3" style={{ animation: 'fadeUp 0.3s ease forwards' }}>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex items-start gap-4 py-2.5 border-b border-white/[0.04]">
                      <span className="text-[10px] tracking-widest uppercase text-white/30 w-36 flex-shrink-0 font-semibold pt-0.5">{key}</span>
                      <span className="text-sm text-white/70 flex-1">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Reviews */}
              {activeTab === 'reviews' && (
                <div className="space-y-4" style={{ animation: 'fadeUp 0.3s ease forwards' }}>
                  {product.reviews.map(review => (
                    <div key={review.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-xs font-black">
                            {review.author[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{review.author}</p>
                            {review.verified && <p className="text-[9px] text-cyan-400 tracking-widest">✓ Verified Purchase</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i} className="text-amber-400 text-xs">★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed">{review.comment}</p>
                      <p className="text-xs text-white/20 mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black">More from <span className="text-gradient-blue">{product.categoryLabel}</span></h2>
              <Link href={`/shop?cat=${product.category}`} className="text-[10px] tracking-widest uppercase text-white/30 hover:text-white transition-colors no-underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06]">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
