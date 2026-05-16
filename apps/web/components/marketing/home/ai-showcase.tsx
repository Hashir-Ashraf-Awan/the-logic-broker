'use client';

import { useEffect, useState } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  Workflow as WorkflowIcon,
  Check,
  GitBranch,
  Zap,
} from 'lucide-react';
import { SectionHeader } from '@/components/primitives/section-header';
import { Reveal } from '@/components/primitives/reveal';
import { EASE_SOFT } from '@/lib/animations';

export function AIShowcase() {
  return (
    <section className="section bg-background-2/40">
      <div className="container-wide">
        <SectionHeader
          eyebrow="06 / AI in product"
          title={
            <>
              The product surface where AI{' '}
              <span className="text-gradient">earns its keep</span>.
            </>
          }
          intro="Three patterns we ship constantly. Each one is a category we have running in production right now."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <ShowcaseCard
              title="Conversational agents"
              tag="Generative"
              body="Domain-grounded copilots that retrieve, reason, and route — with the eval loops to keep them honest."
              demo={<ChatbotDemo />}
            />
          </Reveal>
          <Reveal delay={0.05}>
            <ShowcaseCard
              title="Decision dashboards"
              tag="Analytics"
              body="ML predictions surfaced where the business already works. No new tools to learn; just better numbers."
              demo={<DashboardDemo />}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ShowcaseCard
              title="Autonomous workflows"
              tag="Automation"
              body="Multi-step processes orchestrated by agents with deterministic guardrails. Humans on the loop, not in the loop."
              demo={<WorkflowDemo />}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({
  title,
  tag,
  body,
  demo,
}: {
  title: string;
  tag: string;
  body: string;
  demo: React.ReactNode;
}) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] transition-all duration-control ease-soft hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.04]">
      <div className="relative h-64 overflow-hidden border-b border-white/[0.06] bg-graphite">
        <div className="absolute inset-0 bg-grid bg-[size:48px_48px] opacity-[0.10] mask-fade-y" />
        <div className="relative h-full w-full">{demo}</div>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold tracking-tight">{title}</h3>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
            {tag}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 1) Chatbot demo
// ────────────────────────────────────────────────────────────────────────────

const CHAT_THREAD = [
  { role: 'user' as const, text: 'Which SKUs lost margin last quarter?' },
  { role: 'bot' as const, text: 'Eight SKUs, $1.2M aggregate. Top three:' },
  { role: 'bot' as const, text: '• SKU-3041 — freight ↑18%' },
  { role: 'bot' as const, text: '• SKU-7782 — supplier price ↑11%' },
  { role: 'bot' as const, text: '• SKU-1198 — discount overuse' },
];

function ChatbotDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const reduce = useReducedMotion();
  const visible = inView || reduce;

  return (
    <div ref={ref} className="relative flex h-full flex-col gap-2 p-4">
      <div className="mb-2 inline-flex items-center gap-2 self-start rounded-full border border-white/[0.08] bg-background/60 px-2.5 py-1 text-[0.65rem] text-muted-foreground backdrop-blur">
        <Bot className="h-3 w-3" /> Assistant · grounded
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden">
        {CHAT_THREAD.map((msg, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE_SOFT, delay: i * 0.25 }}
            className={
              msg.role === 'user'
                ? 'self-end rounded-2xl rounded-br-md bg-aurora px-3 py-1.5 text-xs text-white shadow-[0_6px_20px_-8px_hsl(217_91%_60%/0.55)]'
                : 'self-start rounded-2xl rounded-bl-md bg-white/[0.05] px-3 py-1.5 text-xs text-foreground/90 ring-1 ring-white/[0.06]'
            }
          >
            {msg.text}
          </m.div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-full border border-white/[0.08] bg-background/60 px-3 py-1.5 backdrop-blur">
        <Sparkles className="h-3 w-3 text-foreground/50" />
        <span className="text-[0.7rem] text-muted-foreground">Ask a follow-up…</span>
        <Send className="ml-auto h-3 w-3 text-foreground/50" />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 2) Dashboard demo — animated bars + sparkline
// ────────────────────────────────────────────────────────────────────────────

function DashboardDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const reduce = useReducedMotion();
  const visible = inView || reduce;

  const BARS = [38, 62, 51, 78, 45, 71, 84, 67, 92];
  const SPARK = [12, 18, 14, 22, 30, 28, 36, 44, 41, 56, 64, 72];
  const maxY = Math.max(...SPARK);
  const minY = Math.min(...SPARK);

  // Build sparkline path
  const w = 200;
  const h = 50;
  const stepX = w / (SPARK.length - 1);
  const norm = (v: number) => h - ((v - minY) / (maxY - minY || 1)) * h;
  const path = SPARK.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX} ${norm(v)}`).join(' ');

  return (
    <div ref={ref} className="relative flex h-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
          Daily revenue · forecast vs actual
        </p>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] text-emerald-300">
          <TrendingUp className="h-3 w-3" /> +12.4%
        </span>
      </div>

      <div className="flex flex-1 items-end gap-1.5">
        {BARS.map((val, i) => (
          <m.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={visible ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE_SOFT, delay: i * 0.05 }}
            style={{
              transformOrigin: 'bottom',
              height: `${val}%`,
              background:
                'linear-gradient(180deg, hsl(217 91% 60%) 0%, hsl(262 83% 58%) 100%)',
            }}
            className="flex-1 rounded-sm"
          />
        ))}
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="h-12 w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="spark" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(217 91% 60%)" />
            <stop offset="50%" stopColor="hsl(262 83% 58%)" />
            <stop offset="100%" stopColor="hsl(188 94% 56%)" />
          </linearGradient>
        </defs>
        <m.path
          d={path}
          fill="none"
          stroke="url(#spark)"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, ease: EASE_SOFT, delay: 0.3 }}
        />
      </svg>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 3) Workflow demo — animated graph
// ────────────────────────────────────────────────────────────────────────────

function WorkflowDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const reduce = useReducedMotion();
  const visible = inView || reduce;

  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!visible || reduce) return;
    const id = setInterval(() => setTick((t) => (t + 1) % 4), 1100);
    return () => clearInterval(id);
  }, [visible, reduce]);

  const nodes = [
    { icon: Zap, label: 'Trigger', col: 0, row: 1 },
    { icon: WorkflowIcon, label: 'Process', col: 1, row: 1 },
    { icon: GitBranch, label: 'Branch', col: 2, row: 1 },
    { icon: Check, label: 'Action', col: 3, row: 0 },
    { icon: Check, label: 'Action', col: 3, row: 2 },
  ];

  return (
    <div ref={ref} className="relative h-full p-5">
      <svg
        viewBox="0 0 300 200"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="wf-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="hsl(217 91% 60%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(262 83% 58%)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {[
          { d: 'M 50 100 L 110 100', step: 0 },
          { d: 'M 140 100 L 200 100', step: 1 },
          { d: 'M 230 100 Q 260 100 270 60', step: 2 },
          { d: 'M 230 100 Q 260 100 270 140', step: 3 },
        ].map((line, i) => (
          <g key={i}>
            <path d={line.d} stroke="hsl(0 0% 100% / 0.08)" strokeWidth={1.2} fill="none" />
            <m.path
              d={line.d}
              stroke="url(#wf-line)"
              strokeWidth={1.6}
              strokeDasharray="4 6"
              fill="none"
              animate={tick === line.step ? { strokeDashoffset: [-20, 0] } : {}}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </g>
        ))}
      </svg>
      <div className="relative grid h-full grid-cols-4 grid-rows-3 items-center">
        {nodes.map((n, i) => {
          const NodeIcon = n.icon;
          const active = tick === i || (tick === 3 && i === 4);
          return (
            <m.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: EASE_SOFT, delay: 0.2 + i * 0.08 }}
              style={{ gridColumnStart: n.col + 1, gridRowStart: n.row + 1 }}
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-background/80 backdrop-blur transition-all duration-control ease-soft ${
                  active
                    ? 'border-accent-blue/60 shadow-[0_0_24px_-6px_hsl(217_91%_60%/0.7)]'
                    : 'border-white/[0.08]'
                }`}
              >
                <NodeIcon className="h-4 w-4 text-foreground/85" />
              </span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                {n.label}
              </span>
            </m.div>
          );
        })}
      </div>
    </div>
  );
}
