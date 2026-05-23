import {
  Antenna,
  Banknote,
  ShoppingBag,
  HeartPulse,
  Factory,
  Scale,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Industry =
  | 'Telecoms'
  | 'Financial Services'
  | 'Retail'
  | 'Healthcare'
  | 'Manufacturing'
  | 'Legal';

const COVERS: Record<
  Industry,
  { gradient: string; icon: LucideIcon; pattern: 'rings' | 'grid' | 'wave' | 'beams' | 'dots' | 'lines' }
> = {
  Telecoms: {
    gradient: 'from-[hsl(217_91%_55%)] via-[hsl(199_94%_55%)] to-[hsl(188_94%_45%)]',
    icon: Antenna,
    pattern: 'rings',
  },
  'Financial Services': {
    gradient: 'from-[hsl(262_83%_55%)] via-[hsl(243_75%_55%)] to-[hsl(217_91%_55%)]',
    icon: Banknote,
    pattern: 'lines',
  },
  Retail: {
    gradient: 'from-[hsl(330_85%_55%)] via-[hsl(262_83%_55%)] to-[hsl(243_75%_55%)]',
    icon: ShoppingBag,
    pattern: 'dots',
  },
  Healthcare: {
    gradient: 'from-[hsl(160_84%_42%)] via-[hsl(188_94%_45%)] to-[hsl(217_91%_55%)]',
    icon: HeartPulse,
    pattern: 'wave',
  },
  Manufacturing: {
    gradient: 'from-[hsl(36_95%_55%)] via-[hsl(20_90%_55%)] to-[hsl(0_85%_55%)]',
    icon: Factory,
    pattern: 'grid',
  },
  Legal: {
    gradient: 'from-[hsl(220_15%_35%)] via-[hsl(220_18%_25%)] to-[hsl(222_22%_15%)]',
    icon: Scale,
    pattern: 'beams',
  },
};

function PatternLayer({ pattern }: { pattern: keyof typeof COVERS extends never ? never : 'rings' | 'grid' | 'wave' | 'beams' | 'dots' | 'lines' }) {
  switch (pattern) {
    case 'rings':
      return (
        <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden>
          {[60, 110, 160, 210, 260].map((r) => (
            <circle key={r} cx={340} cy={100} r={r} fill="none" stroke="white" strokeWidth="1" />
          ))}
        </svg>
      );
    case 'grid':
      return (
        <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden>
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={200} stroke="white" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 40} x2={400} y2={i * 40} stroke="white" strokeWidth="0.5" />
          ))}
        </svg>
      );
    case 'wave':
      return (
        <svg className="absolute inset-0 h-full w-full opacity-35" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden>
          <path d="M 0 120 Q 80 70 160 120 T 320 120 T 480 120 V 200 H 0 Z" fill="white" opacity="0.15" />
          <path d="M 0 140 Q 80 100 160 140 T 320 140 T 480 140" fill="none" stroke="white" strokeWidth="1.5" />
        </svg>
      );
    case 'beams':
      return (
        <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden>
          {[0, 60, 120, 180, 240, 300, 360].map((x) => (
            <line key={x} x1={x} y1={-20} x2={x + 80} y2={220} stroke="white" strokeWidth="0.5" />
          ))}
        </svg>
      );
    case 'dots':
      return (
        <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden>
          {Array.from({ length: 10 }).flatMap((_, row) =>
            Array.from({ length: 20 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 22 + (row % 2 === 0 ? 0 : 11)}
                cy={row * 22}
                r="1.5"
                fill="white"
              />
            )),
          )}
        </svg>
      );
    case 'lines':
      return (
        <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden>
          {[20, 60, 100, 140, 180].map((y) => (
            <line key={y} x1={0} y1={y} x2={400} y2={y - 30} stroke="white" strokeWidth="0.75" />
          ))}
        </svg>
      );
    default:
      return null;
  }
}

interface Props {
  industry: string;
  className?: string;
  height?: 'sm' | 'md' | 'lg';
}

/**
 * Industry-specific cover art for case study tiles. Pure CSS gradient +
 * inline SVG pattern — no external image dependency, instant render, looks
 * intentional rather than stock-photo bland.
 */
export function IndustryCover({ industry, className, height = 'md' }: Props) {
  const cover = COVERS[industry as Industry] ?? {
    gradient: 'from-[hsl(217_91%_55%)] via-[hsl(262_83%_55%)] to-[hsl(188_94%_45%)]',
    icon: Sparkles,
    pattern: 'rings' as const,
  };
  const CoverIcon = cover.icon;
  const heights = { sm: 'h-24', md: 'h-32', lg: 'h-44 md:h-52' };

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        heights[height],
        'bg-gradient-to-br',
        cover.gradient,
        className,
      )}
    >
      <PatternLayer pattern={cover.pattern} />
      {/* fade to base bg so the cover blends into the tile body */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[hsl(var(--card))]"
      />
      <div className="absolute inset-x-0 bottom-3 flex items-end justify-between px-5">
        <CoverIcon className="h-7 w-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" aria-hidden />
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
          {industry}
        </span>
      </div>
    </div>
  );
}
