import { Reveal } from '@/components/primitives/reveal';
import { Icon } from '@/components/primitives/icon';
import { getServices } from '@/lib/data';

export async function JumpNav() {
  const services = await getServices();

  return (
    <section className="border-y border-white/[0.06] bg-background-2/30">
      <div className="container-wide py-8">
        <Reveal>
          <div className="flex items-center gap-3 overflow-x-auto">
            <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
              Jump to
            </span>
            <div className="flex shrink-0 gap-2">
              {services.map((s) => (
                <a
                  key={s.slug}
                  href={`#${s.slug}`}
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-sm text-foreground/80 transition-all duration-control ease-soft hover:border-white/[0.16] hover:bg-white/[0.04] hover:text-foreground"
                >
                  <Icon
                    name={s.icon}
                    className="h-3.5 w-3.5 text-foreground/60 transition-colors duration-control ease-soft group-hover:text-foreground"
                  />
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
