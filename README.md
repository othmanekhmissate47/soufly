# SOUFLY — Premium Sports E-Commerce

A futuristic Next.js 14 sports e-commerce flagship experience built for the Moroccan market.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **3D**: Three.js (raw, no R3F — full SSR control)
- **State**: Zustand (persisted cart & wishlist)
- **UI**: Custom design system, no UI framework dependency

## Requirements

- Node.js 18+ (tested on v22)
- npm 9+

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# Open http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — Three.js hero, AI search, zone grid, featured products |
| `/shop` | Full product catalog with filtering |
| `/product/[slug]` | Individual product pages with 360° viewer |
| `/store` | Interactive 3D showroom (drag-rotate, scroll-zoom) |
| `/about` | Brand story, stats, timeline, team |
| `/checkout` | 3-step checkout (contact → shipping → payment) |

## Features

- ✅ Real-time Three.js 3D scenes (hero + showroom)
- ✅ AI-powered product search
- ✅ Persistent cart with Zustand
- ✅ Wishlist system
- ✅ Full checkout flow with form validation
- ✅ Animated stats counters
- ✅ Mobile responsive
- ✅ SSR-safe (all window/document usage in useEffect)
- ✅ Cursor glow effect (desktop)
- ✅ Smooth scroll animations

## Environment

No `.env` required. This is a frontend-only project with no backend calls.
