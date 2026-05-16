'use client';

import { LazyMotion, domMax, MotionConfig } from 'framer-motion';
import { type ReactNode } from 'react';

// domMax includes domAnimation + layout/drag features. We need layout for
// the navbar's animated active-pill (uses layoutId); domAnimation alone
// would silently no-op the layout transition.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
