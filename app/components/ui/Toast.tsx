'use client';

import { useToastStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function Toast() {
  const { message, type, visible } = useToastStore();

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] px-6 py-3.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-400 pointer-events-none select-none flex items-center gap-2.5',
        type === 'success' && 'bg-cyan-400/10 border border-cyan-400/30 text-white backdrop-blur-xl shadow-[0_0_30px_rgba(0,229,255,0.15)]',
        type === 'error' && 'bg-red-500/10 border border-red-500/30 text-white backdrop-blur-xl',
        type === 'info' && 'bg-blue-500/10 border border-blue-500/30 text-white backdrop-blur-xl',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
    >
      {type === 'success' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
      {type === 'error'   && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />}
      {type === 'info'    && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
      {message}
    </div>
  );
}
