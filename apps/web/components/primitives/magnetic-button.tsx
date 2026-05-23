'use client';

import { forwardRef, useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-aurora text-white shadow-[0_8px_30px_-8px_hsl(var(--accent-blue)/0.6)] hover:shadow-[0_12px_40px_-8px_hsl(var(--accent-purple)/0.7)]',
  ghost:
    'bg-muted/60 text-foreground border border-border hover:bg-muted/80',
  outline:
    'border border-foreground/15 text-foreground hover:bg-foreground/[0.04]',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-7 text-sm',
  lg: 'h-14 px-9 text-base',
};

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  iconRight?: ReactNode;
  strength?: number; // 0..1, default 0.35
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = BaseProps & { href: string; target?: string; rel?: string };

type Props = ButtonProps | LinkProps;

export const MagneticButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  function MagneticButton(props, ref) {
    const {
      children,
      variant = 'primary',
      size = 'md',
      className,
      iconRight,
      strength = 0.35,
      ...rest
    } = props;

    const localRef = useRef<HTMLElement | null>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

    const labelX = useTransform(sx, (v) => v * 0.5);
    const labelY = useTransform(sy, (v) => v * 0.5);

    const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      const el = (localRef.current ?? e.currentTarget) as HTMLElement;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      x.set(dx * strength);
      y.set(dy * strength);
    };

    const onMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const cls = cn(
      'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight will-change-transform select-none',
      'transition-[box-shadow,background-color] duration-control ease-soft',
      variants[variant],
      sizes[size],
      className,
    );

    const content = (
      <>
        <m.span
          style={{ x: labelX, y: labelY }}
          className="inline-flex items-center gap-2"
        >
          {children}
          {iconRight}
        </m.span>
        {variant === 'primary' && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-aurora opacity-0 blur-xl transition-opacity duration-control ease-soft group-hover:opacity-60"
          />
        )}
      </>
    );

    if ('href' in props && props.href) {
      return (
        <m.span
          style={{ x: sx, y: sy }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="inline-block"
          ref={(el) => {
            localRef.current = el;
          }}
        >
          <Link
            href={props.href}
            target={props.target}
            rel={props.rel}
            className={cls}
            ref={ref as React.Ref<HTMLAnchorElement>}
          >
            {content}
          </Link>
        </m.span>
      );
    }

    const buttonRest = rest as Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      | 'onDrag'
      | 'onDragStart'
      | 'onDragEnd'
      | 'onDragOver'
      | 'onDragEnter'
      | 'onDragLeave'
      | 'onDragExit'
      | 'onAnimationStart'
      | 'onAnimationEnd'
      | 'onAnimationIteration'
    >;
    return (
      <m.button
        {...buttonRest}
        style={{ x: sx, y: sy }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cls}
        ref={(el) => {
          localRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el;
        }}
      >
        {content}
      </m.button>
    );
  },
);
