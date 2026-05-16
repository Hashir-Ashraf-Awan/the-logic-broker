'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { cn, SITE } from '@/lib/utils';
import { z } from 'zod';

const Schema = z.object({
  name: z.string().min(2, 'Please tell us your name'),
  email: z.string().email('A valid email helps us reply'),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(20, 'A few sentences helps us prepare'),
});

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Errors = Partial<Record<keyof z.infer<typeof Schema>, string>>;

const BUDGETS = ['< $50k', '$50–150k', '$150–500k', '$500k+'];

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [topError, setTopError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTopError(null);
    setErrors({});
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = Schema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(`${SITE.apiUrl}/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...parsed.data, source: '/contact' }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Submission failed');
      }
      setStatus('success');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setTopError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-6 md:p-8" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          name="name"
          label="Name"
          autoComplete="name"
          error={errors.name}
          required
        />
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email}
          required
        />
        <Field
          name="company"
          label="Company"
          autoComplete="organization"
          error={errors.company}
        />
        <div>
          <label className="mb-2 block text-xs font-medium text-foreground/70">
            Budget
          </label>
          <select
            name="budget"
            defaultValue=""
            className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 text-sm text-foreground transition-colors duration-control ease-soft focus:border-white/[0.18] focus:bg-white/[0.05] focus:outline-none"
          >
            <option value="">Select a range</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-2 block text-xs font-medium text-foreground/70">
          What are you trying to do? *
        </label>
        <textarea
          name="message"
          rows={5}
          required
          className={cn(
            'block w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-sm leading-relaxed text-foreground transition-colors duration-control ease-soft focus:border-white/[0.18] focus:bg-white/[0.05] focus:outline-none',
            errors.message && 'border-red-500/40',
          )}
          placeholder="Stage, the outcome you want, anything else that helps us prepare."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message}</p>
        )}
      </div>

      {topError && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {topError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting' || status === 'success'}
        className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-aurora px-6 text-sm font-medium text-white transition-transform duration-control ease-soft hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === 'success' && <Check className="h-4 w-4" />}
        {(status === 'idle' || status === 'error') && (
          <ArrowRight className="h-4 w-4" />
        )}
        <span>
          {status === 'success' ? 'Message received' : 'Send message'}
        </span>
      </button>
    </form>
  );
}

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
}

function Field({ name, label, type = 'text', autoComplete, required, error }: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-foreground/70">
        {label}
        {required && ' *'}
      </label>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        className={cn(
          'h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors duration-control ease-soft focus:border-white/[0.18] focus:bg-white/[0.05] focus:outline-none',
          error && 'border-red-500/40',
        )}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
