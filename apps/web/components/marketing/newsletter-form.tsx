'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Subscription failed');
      }
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative">
      <div
        className={cn(
          'flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] pl-4 pr-1 transition-all duration-control ease-soft focus-within:border-white/[0.18] focus-within:bg-white/[0.05]',
          status === 'error' && 'border-red-500/40',
        )}
      >
        <input
          type="email"
          required
          autoComplete="email"
          aria-label="Email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'submitting' || status === 'success'}
          className="h-11 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className="inline-flex h-9 items-center gap-2 rounded-full bg-aurora px-4 text-sm font-medium text-white transition-transform duration-control ease-soft hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === 'success' && <Check className="h-4 w-4" />}
          {(status === 'idle' || status === 'error') && (
            <ArrowRight className="h-4 w-4" />
          )}
          <span>{status === 'success' ? 'Subscribed' : 'Subscribe'}</span>
        </button>
      </div>
      <p
        className={cn(
          'mt-2 text-xs',
          status === 'error' ? 'text-red-400' : 'text-muted-foreground/70',
        )}
      >
        {status === 'error'
          ? error
          : 'One thoughtful email a month. No spam, ever.'}
      </p>
    </form>
  );
}
