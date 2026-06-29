'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/products';

/* ── Cart ── */
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color: string, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, color, qty = 1) => {
        set(state => {
          const existing = state.items.find(
            i => i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
          );
          if (existing) {
            return {
              items: state.items.map(i =>
                i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: qty, selectedSize: size, selectedColor: color }] };
        });
      },

      removeItem: (productId) => {
        set(state => ({ items: state.items.filter(i => i.product.id !== productId) }));
      },

      updateQty: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId);
          return;
        }
        set(state => ({
          items: state.items.map(i => i.product.id === productId ? { ...i, quantity: qty } : i),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(s => ({ isOpen: !s.isOpen })),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: 'soufly-cart' }
  )
);

/* ── Wishlist ── */
interface WishlistStore {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (id) => set(s => ({ ids: [...new Set([...s.ids, id])] })),
      remove: (id) => set(s => ({ ids: s.ids.filter(x => x !== id) })),
      toggle: (id) => get().has(id) ? get().remove(id) : get().add(id),
      has: (id) => get().ids.includes(id),
    }),
    { name: 'soufly-wishlist' }
  )
);

/* ── Toast ── */
export type ToastType = 'success' | 'error' | 'info';
interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
  show: (message: string, type?: ToastType) => void;
  hide: () => void;
}

export const useToastStore = create<ToastState>()((set) => ({
  message: '',
  type: 'success',
  visible: false,
  show: (message, type = 'success') => {
    set({ message, type, visible: true });
    setTimeout(() => set({ visible: false }), 3200);
  },
  hide: () => set({ visible: false }),
}));

/* ── UI ── */
interface UIStore {
  navScrolled: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  setNavScrolled: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  navScrolled: false,
  searchOpen: false,
  mobileMenuOpen: false,
  setNavScrolled: (v) => set({ navScrolled: v }),
  setSearchOpen: (v) => set({ searchOpen: v }),
  toggleMobileMenu: () => set(s => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}));
