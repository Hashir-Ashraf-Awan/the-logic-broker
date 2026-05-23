'use client';

import { m, useReducedMotion } from 'framer-motion';

interface Props {
  d: string;
  delay?: number;
  duration?: number;
  /** strokeDasharray pattern — the moving dashes */
  dash?: string;
  className?: string;
  arrowhead?: boolean;
}

/**
 * Animated SVG path used by architecture diagrams. The dashes scroll along
 * the path to imply data flow without being distracting.
 */
export function FlowArrow({
  d,
  delay = 0,
  duration = 2.4,
  dash = '4 6',
  className,
  arrowhead = true,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <g>
      <path d={d} className={className} fill="none" strokeWidth={1.25} markerEnd={arrowhead ? 'url(#arrowhead)' : undefined} />
      {!reduce && (
        <m.path
          d={d}
          className={className}
          fill="none"
          strokeWidth={1.5}
          strokeDasharray={dash}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
        />
      )}
    </g>
  );
}
