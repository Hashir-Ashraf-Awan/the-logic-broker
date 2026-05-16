import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Icon } from '@/components/primitives/icon';
import { Reveal } from '@/components/primitives/reveal';
import { SectionHeader } from '@/components/primitives/section-header';
import { getServices, type ServiceCard } from '@/lib/data';

export async function Services() {
  const services = await getServices();

  return (
    <section id="services" className="section">
      <div className="container-wide">
        <SectionHeader
          eyebrow="03 / Services"
          title={
            <>
              Eight ways we put AI to work —{' '}
              <span className="text-gradient">in production</span>.
            </>
          }
          intro="Pick a starting point. We will design the rest with you — from discovery through the operating model that keeps it running."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.05}>
              <ServiceTile service={service} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceTile({ service, index }: { service: ServiceCard; index: number }) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-control ease-soft hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.04]"
    >
      {/* hover glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-control ease-soft group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(280px circle at var(--mx, 50%) var(--my, 0%), hsl(217 91% 60% / 0.18), transparent 60%)',
        }}
      />
      {/* gradient hairline on hover */}
      <span className="absolute inset-x-0 -top-px h-px bg-aurora opacity-0 transition-opacity duration-control ease-soft group-hover:opacity-70" />

      <div className="relative flex items-start justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-aurora/15 text-foreground ring-1 ring-white/[0.08]">
          <Icon name={service.icon} className="h-5 w-5" />
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
          {num}
        </span>
      </div>

      <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {service.tagline}
      </p>

      <ul className="mt-5 space-y-1.5 text-sm text-foreground/70">
        {service.features.slice(0, 3).map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-1 w-1 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
            />
            {f}
          </li>
        ))}
      </ul>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-all duration-control ease-soft group-hover:gap-2.5 group-hover:text-foreground">
        Learn more
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-control ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
