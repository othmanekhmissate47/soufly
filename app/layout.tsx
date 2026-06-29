import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/app/components/layout/Navbar';
import { CartDrawer } from '@/app/components/ui/CartDrawer';
import { Toast } from '@/app/components/ui/Toast';
import { CursorGlow } from '@/app/components/ui/CursorGlow';
import { NoiseOverlay } from '@/app/components/ui/NoiseOverlay';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SOUFLY — Future of Sports',
  description: 'Premium sports equipment & fitness accessories for the Moroccan athlete of tomorrow. Football, Running, Fitness, Recovery.',
  keywords: ['sports', 'football', 'fitness', 'Morocco', 'equipment', 'gear', 'soufly'],
  authors: [{ name: 'SOUFLY' }],
  creator: 'SOUFLY',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://soufly.ma',
    title: 'SOUFLY — Future of Sports',
    description: 'Premium sports equipment for the athlete of tomorrow.',
    siteName: 'SOUFLY',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOUFLY — Future of Sports',
    description: 'Premium sports equipment for the athlete of tomorrow.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        <NoiseOverlay />
        <CursorGlow />
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
        <Toast />
      </body>
    </html>
  );
}
