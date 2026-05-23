'use client';

import { m, useReducedMotion } from 'framer-motion';
import { FlowArrow } from './flow-arrow';

const NODE_CLS = 'fill-[hsl(var(--card))] stroke-[hsl(var(--border))]';
const NODE_HOT = 'fill-[hsl(var(--card-elevated))] stroke-[hsl(217_91%_60%/0.5)]';
const TEXT_PRIMARY = 'fill-[hsl(var(--foreground))] font-medium';
const TEXT_MUTED = 'fill-[hsl(var(--muted-foreground))]';
const FLOW = 'stroke-[hsl(217_91%_60%/0.7)]';
const FLOW_SECONDARY = 'stroke-[hsl(262_83%_60%/0.7)]';

/** Reusable rounded-rect node with title + optional subtitle. */
function Node({
  x,
  y,
  w,
  h,
  title,
  subtitle,
  hot,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle?: string;
  hot?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        className={hot ? NODE_HOT : NODE_CLS}
      />
      <text
        x={x + w / 2}
        y={y + (subtitle ? h / 2 - 4 : h / 2 + 4)}
        textAnchor="middle"
        className={`${TEXT_PRIMARY} text-[12px]`}
      >
        {title}
      </text>
      {subtitle && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          className={`${TEXT_MUTED} text-[10px]`}
        >
          {subtitle}
        </text>
      )}
    </g>
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="arrowhead"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" className="fill-[hsl(217_91%_60%/0.7)]" />
      </marker>
      <linearGradient id="hot-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity="0.25" />
        <stop offset="100%" stopColor="hsl(262 83% 60%)" stopOpacity="0.25" />
      </linearGradient>
    </defs>
  );
}

/** RAG — retrieval-augmented generation */
export function RagDiagram() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 800 360" className="w-full" role="img" aria-label="Retrieval-augmented generation architecture">
      <ArrowDefs />

      <Node x={30} y={150} w={140} h={60} title="User query" subtitle="web · chat · API" />
      <Node x={220} y={60} w={150} h={60} title="Embed + retrieve" subtitle="hybrid vector + BM25" />
      <Node x={220} y={240} w={150} h={60} title="Guardrails" subtitle="prompt · policy" />
      <Node x={420} y={150} w={150} h={60} title="LLM" subtitle="grounded generation" hot />
      <Node x={620} y={60} w={150} h={60} title="Eval harness" subtitle="faithfulness · graded" />
      <Node x={620} y={240} w={150} h={60} title="Citations" subtitle="audit-ready" />

      <FlowArrow d="M 170 180 C 195 180, 195 90, 220 90" className={FLOW} />
      <FlowArrow d="M 170 180 C 195 180, 195 270, 220 270" className={FLOW_SECONDARY} delay={0.3} />
      <FlowArrow d="M 370 90 C 395 90, 395 180, 420 180" className={FLOW} delay={0.6} />
      <FlowArrow d="M 370 270 C 395 270, 395 180, 420 180" className={FLOW_SECONDARY} delay={0.9} />
      <FlowArrow d="M 570 180 C 595 180, 595 90, 620 90" className={FLOW} delay={1.2} />
      <FlowArrow d="M 570 180 C 595 180, 595 270, 620 270" className={FLOW_SECONDARY} delay={1.5} />

      {!reduce && (
        <m.circle
          cx={495}
          cy={180}
          r={6}
          className="fill-[hsl(217_91%_60%)]"
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </svg>
  );
}

/** Agentic workflow — planning + tools */
export function AgenticDiagram() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 800 360" className="w-full" role="img" aria-label="Agentic workflow architecture">
      <ArrowDefs />

      <Node x={30} y={150} w={140} h={60} title="Goal" subtitle="user intent" />
      <Node x={220} y={150} w={150} h={60} title="Planner" subtitle="LLM · decomposes" hot />
      <Node x={420} y={40} w={140} h={50} title="Tool · search" />
      <Node x={420} y={110} w={140} h={50} title="Tool · API call" />
      <Node x={420} y={180} w={140} h={50} title="Tool · code exec" />
      <Node x={420} y={250} w={140} h={50} title="Human approve" subtitle="HITL gate" />
      <Node x={620} y={150} w={150} h={60} title="Verifier" subtitle="critic + replay" />

      <FlowArrow d="M 170 180 L 220 180" className={FLOW} />
      <FlowArrow d="M 370 180 C 395 180, 395 65, 420 65" className={FLOW} delay={0.3} />
      <FlowArrow d="M 370 180 C 395 180, 395 135, 420 135" className={FLOW} delay={0.5} />
      <FlowArrow d="M 370 180 L 420 205" className={FLOW} delay={0.7} />
      <FlowArrow d="M 370 180 C 395 180, 395 275, 420 275" className={FLOW_SECONDARY} delay={0.9} />

      <FlowArrow d="M 560 65 C 585 65, 585 180, 620 180" className={FLOW} delay={1.1} />
      <FlowArrow d="M 560 135 L 620 180" className={FLOW} delay={1.3} />
      <FlowArrow d="M 560 205 L 620 180" className={FLOW} delay={1.5} />
      <FlowArrow d="M 560 275 C 585 275, 585 180, 620 180" className={FLOW_SECONDARY} delay={1.7} />

      {/* feedback loop */}
      <FlowArrow d="M 620 195 C 540 340, 280 340, 220 215" className={FLOW_SECONDARY} delay={2} dash="3 5" />

      {!reduce && (
        <m.circle
          cx={295}
          cy={180}
          r={5}
          className="fill-[hsl(217_91%_60%)]"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </svg>
  );
}

/** Eval loop — continuous benchmarking */
export function EvalDiagram() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 800 360" className="w-full" role="img" aria-label="Evaluation loop architecture">
      <ArrowDefs />

      <Node x={30} y={150} w={140} h={60} title="PR / change" subtitle="prompt · model · data" />
      <Node x={220} y={150} w={150} h={60} title="Eval harness" subtitle="graded benchmarks" hot />
      <Node x={420} y={70} w={140} h={50} title="LLM judge" />
      <Node x={420} y={140} w={140} h={50} title="Programmatic" />
      <Node x={420} y={210} w={140} h={50} title="Human SME" />
      <Node x={620} y={150} w={150} h={60} title="Gate" subtitle="ship / block" />
      <Node x={420} y={300} w={340} h={40} title="Run logs → Postgres + dashboard" />

      <FlowArrow d="M 170 180 L 220 180" className={FLOW} />
      <FlowArrow d="M 370 180 C 395 180, 395 95, 420 95" className={FLOW} delay={0.3} />
      <FlowArrow d="M 370 180 L 420 165" className={FLOW} delay={0.5} />
      <FlowArrow d="M 370 180 C 395 180, 395 235, 420 235" className={FLOW} delay={0.7} />

      <FlowArrow d="M 560 95 C 585 95, 585 180, 620 180" className={FLOW} delay={1} />
      <FlowArrow d="M 560 165 L 620 180" className={FLOW} delay={1.1} />
      <FlowArrow d="M 560 235 C 585 235, 585 180, 620 180" className={FLOW} delay={1.3} />

      <FlowArrow d="M 295 210 L 295 300" className={FLOW_SECONDARY} delay={1.5} dash="3 6" />
      <FlowArrow d="M 495 260 L 495 300" className={FLOW_SECONDARY} delay={1.7} dash="3 6" />
      <FlowArrow d="M 695 210 L 695 300" className={FLOW_SECONDARY} delay={1.9} dash="3 6" />
    </svg>
  );
}

/** Real-time inference — streaming + cache */
export function RealtimeDiagram() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 800 360" className="w-full" role="img" aria-label="Real-time inference architecture">
      <ArrowDefs />

      <Node x={30} y={150} w={140} h={60} title="Event stream" subtitle="Kafka / Pulsar" />
      <Node x={220} y={150} w={140} h={60} title="Feature lookup" subtitle="online store" />
      <Node x={400} y={70} w={140} h={50} title="Cache · L1" />
      <Node x={400} y={150} w={140} h={60} title="Model server" subtitle="<200ms p99" hot />
      <Node x={400} y={240} w={140} h={50} title="Shadow model" />
      <Node x={600} y={150} w={170} h={60} title="Decisioning service" subtitle="rules + model" />
      <Node x={400} y={310} w={340} h={40} title="Observability · Datadog / OpenTelemetry" />

      <FlowArrow d="M 170 180 L 220 180" className={FLOW} />
      <FlowArrow d="M 360 180 C 380 180, 380 95, 400 95" className={FLOW} delay={0.3} />
      <FlowArrow d="M 360 180 L 400 180" className={FLOW} delay={0.5} />
      <FlowArrow d="M 360 180 C 380 180, 380 265, 400 265" className={FLOW_SECONDARY} delay={0.7} />

      <FlowArrow d="M 540 95 C 570 95, 570 180, 600 180" className={FLOW} delay={1} />
      <FlowArrow d="M 540 180 L 600 180" className={FLOW} delay={1.1} />

      <FlowArrow d="M 470 210 L 470 310" className={FLOW_SECONDARY} delay={1.4} dash="3 6" />
      <FlowArrow d="M 470 290 L 470 310" className={FLOW_SECONDARY} delay={1.6} dash="3 6" />
      <FlowArrow d="M 685 210 L 685 310" className={FLOW_SECONDARY} delay={1.8} dash="3 6" />

      {!reduce && (
        <m.circle
          cx={470}
          cy={180}
          r={5}
          className="fill-[hsl(217_91%_60%)]"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </svg>
  );
}
