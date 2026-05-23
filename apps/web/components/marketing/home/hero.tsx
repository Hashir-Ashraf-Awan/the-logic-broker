'use client';

import { useRef, useState } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { MagneticButton } from '@/components/primitives/magnetic-button';
import { AnimatedGradient } from '@/components/primitives/animated-gradient';
import { Particles } from '@/components/primitives/particles';
import { EASE_SOFT, stagger, fadeUp } from '@/lib/animations';
import { cn } from '@/lib/utils';

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgFailed, setBgFailed] = useState(false);

  // Scroll-driven parallax for the backdrop layers. The hero is the
  // anchor; we read `scrollYProgress` against it and translate the
  // gradient/image layers up while content stays put.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const gradientY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-40 md:pb-44"
    >
      {/* Optional background image — drops in from /public/hero/hero-bg.jpg.
          Renders nothing if the file is missing (see /public/hero/README.md). */}
      {!bgFailed && (
        <m.img
          src="/hero/hero-bg.jpg"
          alt=""
          aria-hidden
          style={reduce ? undefined : { y: bgY }}
          className={cn(
            'absolute inset-0 -z-30 h-full w-full object-cover transition-opacity duration-1000',
            bgLoaded ? 'opacity-30' : 'opacity-0',
          )}
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgFailed(true)}
        />
      )}
      {/* dimming overlay sits above the image, below the gradient */}
      {bgLoaded && !bgFailed && (
        <div aria-hidden className="absolute inset-0 -z-20 bg-background/55" />
      )}

      {/* cinematic backdrop with parallax */}
      <m.div
        style={reduce ? undefined : { y: gradientY }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <AnimatedGradient />
      </m.div>
      <Particles count={28} className="absolute inset-0 -z-10 h-full w-full" />

      {/* top radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] bg-radial-fade"
      />

      <m.div
        style={reduce ? undefined : { y: contentY }}
        className="container-wide relative"
      >
        <m.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* tag */}
          <m.div variants={fadeUp} className="mb-7 flex justify-center">
            <a
              href="/ai-solutions"
              className="group inline-flex items-center gap-2 rounded-full surface py-1.5 pl-1.5 pr-4 text-xs text-foreground/80 backdrop-blur-md transition-colors duration-control ease-soft hover:bg-muted/60"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-aurora px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-white">
                <Sparkles className="h-3 w-3" />
                New
              </span>
              <span>The 2026 enterprise AI playbook is live</span>
              <ArrowRight className="h-3.5 w-3.5 -translate-x-0.5 opacity-60 transition-all duration-control ease-soft group-hover:translate-x-0 group-hover:opacity-100" />
            </a>
          </m.div>

          {/* eyebrow */}
          <m.p variants={fadeUp} className="eyebrow mb-6">
            AI &amp; data engineering, built for the enterprise
          </m.p>

          {/* headline */}
          <m.h1
            variants={fadeUp}
            className="font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-display"
          >
            We ship AI that{' '}
            <span className="text-gradient-animated">survives contact</span>
            <br className="hidden md:block" /> with the real world.
          </m.h1>

          {/* subhead */}
          <m.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground"
          >
            The Logic Broker is a senior delivery team for ambitious enterprises —
            data engineering, AI automation, ML, and the operating model that
            makes them stick. AWS, GCP, Azure, Snowflake, dbt, Power BI; we meet
            you where you ship.
          </m.p>

          {/* CTAs */}
          <m.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton href="/contact" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              Book a consultation
            </MagneticButton>
            <MagneticButton
              href="/services"
              variant="ghost"
              size="lg"
              iconRight={<Play className="h-3.5 w-3.5" />}
            >
              Explore services
            </MagneticButton>
          </m.div>
        </m.div>
      </m.div>

      {/* hero stat strip */}
      <m.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE_SOFT, delay: 0.6 }}
        className="absolute inset-x-0 bottom-0 hidden border-t border-border bg-background/40 backdrop-blur-md md:block"
      >
        <div className="container-wide grid grid-cols-3 divide-x divide-border">
          {[
            { value: '60+', label: 'Production systems shipped' },
            { value: '$200M+', label: 'Combined value unlocked for clients' },
            { value: '12wk', label: 'Median time from discovery to live' },
          ].map((stat) => (
            <div key={stat.label} className="px-6 py-6">
              <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                <span className="text-gradient">{stat.value}</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </m.div>
    </section>
  );
}
