'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore, useToastStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Footer } from '@/app/components/layout/Footer';

/* ── Types ── */
type Step = 'contact' | 'shipping' | 'payment' | 'confirmation';

interface FormData {
  // Contact
  email: string;
  phone: string;
  // Shipping
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  // Payment
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  // Options
  saveInfo: boolean;
  newsletter: boolean;
}

const INITIAL_FORM: FormData = {
  email: '', phone: '',
  firstName: '', lastName: '', address: '', city: '', postalCode: '', country: 'Morocco',
  cardNumber: '', cardName: '', expiry: '', cvv: '',
  saveInfo: false, newsletter: false,
};

const STEPS: { key: Step; label: string; icon: string }[] = [
  { key: 'contact',      label: 'Contact',  icon: '📧' },
  { key: 'shipping',     label: 'Shipping', icon: '📦' },
  { key: 'payment',      label: 'Payment',  icon: '💳' },
  { key: 'confirmation', label: 'Done',     icon: '✓'  },
];

/* ── Helpers ── */
function formatCardNumber(value: string): string {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 4);
  if (clean.length >= 3) return `${clean.slice(0, 2)} / ${clean.slice(2)}`;
  return clean;
}

/* ── Input component ── */
function Field({
  label, value, onChange, type = 'text', placeholder = '', required = true, className = '',
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean; className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold">
        {label}{required && <span className="text-cyan-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:border-cyan-400/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(0,229,255,0.08)]"
      />
    </div>
  );
}

/* ── Order summary item ── */
function OrderItem({ name, emoji, price, qty, size, color }: {
  name: string; emoji: string; price: number; qty: number; size: string; color: string;
}) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-white/[0.06] last:border-0">
      <div className="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-2xl flex-shrink-0">
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate">{name}</p>
        <p className="text-xs text-white/35 mt-0.5">{size} · {color} · Qty {qty}</p>
      </div>
      <p className="text-sm font-black text-white flex-shrink-0">{(price * qty).toLocaleString()} MAD</p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CHECKOUT PAGE
════════════════════════════════════════════════════════ */
export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { show } = useToastStore();
  const [step, setStep] = useState<Step>('contact');
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [orderNumber] = useState(() => `SF-${Date.now().toString(36).toUpperCase()}`);

  const total = totalPrice();
  const shipping = total > 0 ? (total >= 800 ? 0 : 49) : 0;
  const grandTotal = total + shipping;

  const setField = (key: keyof FormData) => (value: string | boolean) => {
    setForm(f => ({ ...f, [key]: value }));
  };

  /* Redirect empty cart to shop */
  useEffect(() => {
    if (items.length === 0 && step !== 'confirmation') {
      /* intentionally soft — allows arriving post-clear */
    }
  }, [items, step]);

  const stepIndex = STEPS.findIndex(s => s.key === step);

  function validateContact() {
    if (!form.email.trim()) { show('Email is required', 'error'); return false; }
    if (!form.email.includes('@')) { show('Enter a valid email', 'error'); return false; }
    return true;
  }
  function validateShipping() {
    if (!form.firstName || !form.lastName || !form.address || !form.city) {
      show('Please fill all shipping fields', 'error'); return false;
    }
    return true;
  }
  function validatePayment() {
    if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length < 16) {
      show('Enter a valid card number', 'error'); return false;
    }
    if (!form.cardName) { show('Cardholder name required', 'error'); return false; }
    if (!form.expiry || form.expiry.length < 7) { show('Enter valid expiry', 'error'); return false; }
    if (!form.cvv || form.cvv.length < 3) { show('Enter valid CVV', 'error'); return false; }
    return true;
  }

  async function handleNext() {
    if (step === 'contact') {
      if (!validateContact()) return;
      setStep('shipping');
    } else if (step === 'shipping') {
      if (!validateShipping()) return;
      setStep('payment');
    } else if (step === 'payment') {
      if (!validatePayment()) return;
      setLoading(true);
      /* Simulate payment processing */
      await new Promise(r => setTimeout(r, 1800));
      setLoading(false);
      clearCart();
      setStep('confirmation');
    }
  }

  /* ── Confirmation screen ── */
  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-24 text-center">
        {/* Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-lg mx-auto">
          {/* Check icon */}
          <div
            className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center text-4xl"
            style={{
              background: 'linear-gradient(135deg, rgba(0,102,255,0.15), rgba(0,229,255,0.1))',
              border: '1px solid rgba(0,229,255,0.3)',
              boxShadow: '0 0 60px rgba(0,229,255,0.2)',
              animation: 'fadeIn 0.6s ease forwards',
            }}
          >
            ✓
          </div>

          <p className="eyebrow mb-4" style={{ animation: 'fadeUp 0.6s 0.2s ease both' }}>
            Order Confirmed
          </p>
          <h1
            className="text-4xl md:text-5xl font-black tracking-tight mb-4"
            style={{ animation: 'fadeUp 0.6s 0.3s ease both' }}
          >
            Thank You,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #0066ff, #00e5ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {form.firstName || 'Athlete'}!
            </span>
          </h1>
          <p
            className="text-sm text-white/40 leading-relaxed mb-8"
            style={{ animation: 'fadeUp 0.6s 0.4s ease both' }}
          >
            Your order{' '}
            <span className="text-cyan-400 font-black">{orderNumber}</span> has been placed
            successfully. We'll send a confirmation to{' '}
            <span className="text-white">{form.email}</span> and ship within 24–48 hours.
          </p>

          {/* Summary box */}
          <div
            className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-left mb-8"
            style={{ animation: 'fadeUp 0.6s 0.5s ease both' }}
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">Order Total</p>
              <p className="text-xl font-black">{grandTotal.toLocaleString()} MAD</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">Estimated Delivery</p>
              <p className="text-sm text-white/70">24–48 hours</p>
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animation: 'fadeUp 0.6s 0.6s ease both' }}
          >
            <Link href="/shop" className="btn btn-primary px-8 py-4 text-[11px] no-underline">
              Continue Shopping
            </Link>
            <Link href="/" className="btn btn-ghost px-8 py-4 text-[11px] no-underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Empty cart ── */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 text-center px-6">
        <div className="text-6xl opacity-20">🛒</div>
        <h2 className="text-2xl font-black">Your cart is empty</h2>
        <p className="text-sm text-white/40">Add some products before checking out.</p>
        <Link href="/shop" className="btn btn-primary px-8 py-4 text-[11px] no-underline">
          Shop Now
        </Link>
      </div>
    );
  }

  /* ════════════════════════════════════
     MAIN CHECKOUT LAYOUT
  ════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-black">

      {/* ── Top bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-b border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="no-underline">
            <span
              className="text-xl font-black tracking-[0.3em]"
              style={{
                background: 'linear-gradient(135deg, #fff, #00e5ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              SOUFLY
            </span>
          </Link>

          {/* Step indicators */}
          <div className="hidden md:flex items-center gap-2">
            {STEPS.slice(0, 3).map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-black transition-all duration-300',
                    stepIndex === i
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white'
                      : stepIndex > i
                      ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20'
                      : 'text-white/30 border border-white/[0.08]'
                  )}
                >
                  <span>{stepIndex > i ? '✓' : s.icon}</span>
                  <span className="hidden lg:block">{s.label}</span>
                </div>
                {i < 2 && <div className="w-6 h-px bg-white/10" />}
              </div>
            ))}
          </div>

          <Link href="/shop" className="text-xs text-white/30 hover:text-white transition-colors no-underline flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Shop
          </Link>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="pt-24 pb-16">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">

          {/* ── LEFT: Form ── */}
          <div>
            {/* Mobile step indicator */}
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              {STEPS.slice(0, 3).map((s, i) => (
                <div key={s.key} className="flex items-center gap-2">
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all',
                    stepIndex === i ? 'bg-gradient-to-br from-blue-600 to-cyan-400 text-white' :
                    stepIndex > i ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/[0.06] text-white/30'
                  )}>
                    {stepIndex > i ? '✓' : i + 1}
                  </div>
                  {i < 2 && <div className="flex-1 h-px bg-white/[0.08]" />}
                </div>
              ))}
            </div>

            {/* ── STEP: CONTACT ── */}
            {step === 'contact' && (
              <div style={{ animation: 'fadeUp 0.4s ease forwards' }}>
                <h2 className="text-2xl font-black mb-2">Contact Info</h2>
                <p className="text-sm text-white/35 mb-8">We'll use these details for your order and delivery updates.</p>

                <div className="space-y-5">
                  <Field label="Email Address"  value={form.email} onChange={setField('email')} type="email" placeholder="your@email.com" />
                  <Field label="Phone Number"   value={form.phone} onChange={setField('phone')} type="tel"  placeholder="+212 6XX-XXXXXX" required={false} />
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => setForm(f => ({ ...f, newsletter: !f.newsletter }))}
                    className={cn(
                      'w-5 h-5 rounded border flex items-center justify-center transition-all',
                      form.newsletter ? 'bg-cyan-400 border-cyan-400' : 'border-white/20 bg-transparent'
                    )}
                  >
                    {form.newsletter && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </button>
                  <label className="text-xs text-white/40 cursor-pointer" onClick={() => setForm(f => ({ ...f, newsletter: !f.newsletter }))}>
                    Subscribe to SOUFLY news & exclusive offers
                  </label>
                </div>
              </div>
            )}

            {/* ── STEP: SHIPPING ── */}
            {step === 'shipping' && (
              <div style={{ animation: 'fadeUp 0.4s ease forwards' }}>
                <h2 className="text-2xl font-black mb-2">Shipping Address</h2>
                <p className="text-sm text-white/35 mb-8">Where should we deliver your order?</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="First Name" value={form.firstName} onChange={setField('firstName')} placeholder="Youssef" />
                  <Field label="Last Name"  value={form.lastName}  onChange={setField('lastName')}  placeholder="Elhassani" />
                  <Field label="Street Address" value={form.address} onChange={setField('address')} placeholder="123 Rue Mohammed V" className="sm:col-span-2" />
                  <Field label="City"        value={form.city}       onChange={setField('city')}       placeholder="Casablanca" />
                  <Field label="Postal Code" value={form.postalCode} onChange={setField('postalCode')} placeholder="20000" />
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold">
                      Country<span className="text-cyan-400 ml-0.5">*</span>
                    </label>
                    <select
                      value={form.country}
                      onChange={e => setField('country')(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white outline-none focus:border-cyan-400/50 transition-colors cursor-pointer"
                      style={{ background: '#0a0a18' }}
                    >
                      {['Morocco', 'France', 'Spain', 'Belgium', 'Netherlands', 'Germany', 'Canada', 'USA', 'Other'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Shipping methods */}
                <div className="mt-8">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4 font-semibold">Shipping Method</p>
                  <div className="space-y-3">
                    {[
                      { id: 'standard', label: 'Standard Delivery', time: '3–5 business days', price: total >= 800 ? 0 : 49 },
                      { id: 'express',  label: 'Express Delivery',  time: '24–48 hours',        price: 99 },
                    ].map(method => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                            {method.id === 'standard' && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{method.label}</p>
                            <p className="text-xs text-white/30 mt-0.5">{method.time}</p>
                          </div>
                        </div>
                        <p className="text-sm font-black text-white">
                          {method.price === 0 ? 'Free' : `${method.price} MAD`}
                        </p>
                      </div>
                    ))}
                  </div>
                  {total >= 800 && (
                    <p className="text-xs text-cyan-400 mt-3 flex items-center gap-1.5">
                      <span>✓</span>
                      Free standard shipping on orders over 800 MAD
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ── STEP: PAYMENT ── */}
            {step === 'payment' && (
              <div style={{ animation: 'fadeUp 0.4s ease forwards' }}>
                <h2 className="text-2xl font-black mb-2">Payment</h2>
                <p className="text-sm text-white/35 mb-8">
                  All transactions are encrypted and secure.
                </p>

                {/* Security badges */}
                <div className="flex items-center gap-3 mb-8 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <p className="text-xs text-white/40">
                    Your payment information is protected with 256-bit SSL encryption
                  </p>
                </div>

                <div className="space-y-5">
                  <Field
                    label="Card Number"
                    value={form.cardNumber}
                    onChange={v => setField('cardNumber')(formatCardNumber(v))}
                    placeholder="1234 5678 9012 3456"
                  />
                  <Field
                    label="Cardholder Name"
                    value={form.cardName}
                    onChange={setField('cardName')}
                    placeholder="YOUSSEF ELHASSANI"
                  />
                  <div className="grid grid-cols-2 gap-5">
                    <Field
                      label="Expiry Date"
                      value={form.expiry}
                      onChange={v => setField('expiry')(formatExpiry(v))}
                      placeholder="MM / YY"
                    />
                    <Field
                      label="CVV"
                      value={form.cvv}
                      onChange={v => setField('cvv')(v.replace(/\D/g, '').slice(0, 4))}
                      type="password"
                      placeholder="···"
                    />
                  </div>
                </div>

                {/* Save info toggle */}
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => setForm(f => ({ ...f, saveInfo: !f.saveInfo }))}
                    className={cn(
                      'w-5 h-5 rounded border flex items-center justify-center transition-all flex-shrink-0',
                      form.saveInfo ? 'bg-cyan-400 border-cyan-400' : 'border-white/20'
                    )}
                  >
                    {form.saveInfo && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </button>
                  <span className="text-xs text-white/40 cursor-pointer" onClick={() => setForm(f => ({ ...f, saveInfo: !f.saveInfo }))}>
                    Save this card for future orders
                  </span>
                </div>

                {/* Accepted cards */}
                <div className="mt-6 flex items-center gap-2">
                  <p className="text-[9px] text-white/20 mr-2 uppercase tracking-widest">Accepted:</p>
                  {['Visa', 'MC', 'Amex', 'Paypal'].map(c => (
                    <span key={c} className="px-2.5 py-1 rounded text-[9px] font-black border border-white/[0.08] bg-white/[0.03] text-white/30">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Navigation buttons ── */}
            <div className="flex items-center gap-4 mt-10">
              {step !== 'contact' && (
                <button
                  onClick={() => {
                    if (step === 'shipping') setStep('contact');
                    if (step === 'payment')  setStep('shipping');
                  }}
                  className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                  Back
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={loading}
                className={cn(
                  'flex-1 md:flex-none md:min-w-[220px] py-4 rounded-full text-[11px] tracking-[0.25em] uppercase font-black text-white transition-all duration-300',
                  loading
                    ? 'bg-white/10 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-400 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,102,255,0.5)] active:scale-95'
                )}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                    Processing…
                  </span>
                ) : step === 'payment' ? (
                  `Pay ${grandTotal.toLocaleString()} MAD`
                ) : (
                  'Continue →'
                )}
              </button>
            </div>

            {/* Security note */}
            {step === 'payment' && (
              <p className="text-[10px] text-white/20 mt-4 leading-relaxed">
                By placing your order you agree to SOUFLY's{' '}
                <Link href="#" className="text-white/40 hover:text-cyan-400 transition-colors no-underline">Terms</Link>
                {' '}and{' '}
                <Link href="#" className="text-white/40 hover:text-cyan-400 transition-colors no-underline">Privacy Policy</Link>.
                You will be charged {grandTotal.toLocaleString()} MAD.
              </p>
            )}
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
              <div className="px-6 py-5 border-b border-white/[0.06]">
                <h3 className="text-sm font-black tracking-tight">Order Summary</h3>
                <p className="text-xs text-white/30 mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''}</p>
              </div>

              <div className="px-6 py-4 max-h-[320px] overflow-y-auto">
                {items.map(item => (
                  <OrderItem
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    name={item.product.name}
                    emoji={item.product.emoji}
                    price={item.product.price}
                    qty={item.quantity}
                    size={item.selectedSize}
                    color={item.selectedColor}
                  />
                ))}
              </div>

              {/* Promo code */}
              <div className="px-6 pb-5 border-t border-white/[0.06] pt-5">
                <div className="flex gap-2 mb-5">
                  <input
                    placeholder="Promo code"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-white/20 outline-none focus:border-cyan-400/40 transition-colors"
                  />
                  <button className="px-4 py-2.5 rounded-xl border border-cyan-400/30 bg-cyan-400/[0.06] text-xs text-cyan-400 font-black hover:bg-cyan-400/10 transition-colors flex-shrink-0">
                    Apply
                  </button>
                </div>

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/40">Subtotal</span>
                    <span className="text-sm font-bold">{total.toLocaleString()} MAD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/40">Shipping</span>
                    <span className={cn('text-sm font-bold', shipping === 0 ? 'text-cyan-400' : '')}>
                      {shipping === 0 ? 'Free' : `${shipping} MAD`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/[0.06]">
                    <span className="text-sm font-black">Total</span>
                    <span
                      className="text-xl font-black"
                      style={{
                        background: 'linear-gradient(135deg, #fff, #00e5ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {grandTotal.toLocaleString()} MAD
                    </span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-2 text-center">
                  {[
                    { icon: '🔒', label: 'Secure' },
                    { icon: '↩️', label: '30-Day Return' },
                    { icon: '🚀', label: 'Fast Shipping' },
                  ].map(badge => (
                    <div key={badge.label} className="flex flex-col items-center gap-1">
                      <span className="text-base">{badge.icon}</span>
                      <span className="text-[8px] text-white/25 uppercase tracking-widest">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
