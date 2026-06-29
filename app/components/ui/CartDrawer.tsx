'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCartStore, useToastStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice, clearCart } = useCartStore();
  const { show } = useToastStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const total = totalPrice();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    show(`Removed ${name} from cart`, 'info');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-400',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          'fixed right-0 top-0 bottom-0 z-[70] w-full max-w-[420px] bg-[#060610] border-l border-white/[0.08] flex flex-col transition-transform duration-500',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div>
            <h2 className="text-lg font-black tracking-tight">Your Cart</h2>
            <p className="text-xs text-white/40 mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center pb-20">
              <div className="text-6xl opacity-20">🛒</div>
              <p className="text-white/40 text-sm">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-[10px] tracking-[0.2em] uppercase font-black text-white hover:scale-105 transition-all duration-300"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] group hover:border-white/[0.10] transition-all duration-200"
              >
                {/* Emoji thumb */}
                <div className="w-16 h-16 rounded-lg bg-white/[0.05] flex items-center justify-center text-3xl flex-shrink-0">
                  {item.product.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{item.product.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">
                    {item.selectedSize} · {item.selectedColor}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <div className="flex items-center gap-1 border border-white/[0.10] rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
                      >
                        −
                      </button>
                      <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-cyan-400">
                        {(item.product.price * item.quantity).toLocaleString()} MAD
                      </span>
                      <button
                        onClick={() => handleRemove(item.product.id, item.product.name)}
                        className="text-white/20 hover:text-red-400 transition-colors"
                        aria-label="Remove"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/[0.08] px-6 py-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">Subtotal</span>
              <span className="text-xl font-black">{total.toLocaleString()} MAD</span>
            </div>
            <p className="text-xs text-white/30">Shipping & taxes calculated at checkout</p>

            {/* Checkout */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-center text-[11px] tracking-[0.25em] uppercase font-black text-white hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,102,255,0.5)] transition-all duration-300 no-underline"
            >
              Checkout — {total.toLocaleString()} MAD
            </Link>

            <button
              onClick={closeCart}
              className="block w-full py-3 text-center text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
