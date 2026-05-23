import { Linkedin, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/primitives/reveal';
import { SectionHeader } from '@/components/primitives/section-header';

const TEAM = [
  {
    role: 'Founder & Principal',
    domain: 'Data Platforms · Strategy',
    bio: 'Fifteen years building data infrastructure across telecoms, fintech, and consumer goods. Ex-Big Four lead architect.',
  },
  {
    role: 'Head of AI',
    domain: 'Generative AI · Eval Frameworks',
    bio: 'Author of three production RAG systems running for Fortune-tier clients. Speaks at NeurIPS and writes about evals.',
  },
  {
    role: 'Engineering Lead',
    domain: 'MLOps · Reliability',
    bio: 'Built the on-call rotation that kept a 99.99% SLA on a 50M-event-per-day fraud system. Believes runbooks are art.',
  },
  {
    role: 'Director of Delivery',
    domain: 'Programme Management',
    bio: 'Has shipped twenty-plus AI engagements without slipping. The reason your stand-ups are useful and your retros are honest.',
  },
  {
    role: 'Principal ML Engineer',
    domain: 'Computer Vision · Edge',
    bio: 'PhD in vision systems. Deploys models to factory floors where latency budgets are measured in milliseconds.',
  },
  {
    role: 'Research Lead',
    domain: 'NLP · Fine-tuning',
    bio: 'Specialises in domain adaptation. Has fine-tuned LLMs on legal, medical, and supply-chain corpora.',
  },
];

export function Team() {
  return (
    <section className="section">
      <div className="container-wide">
        <SectionHeader
          eyebrow="03 / Team"
          title={
            <>
              The people who will <span className="text-gradient">show up</span>.
            </>
          }
          intro="No bait-and-switch. The senior people you meet in discovery are the ones who write the production code. We deliberately stay small so this stays true."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((person, i) => (
            <Reveal key={person.role} delay={i * 0.04}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-control ease-soft hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.04]">
                <div className="flex items-center gap-4">
                  <div
                    aria-hidden
                    className="relative h-14 w-14 overflow-hidden rounded-full bg-aurora/20 ring-1 ring-white/[0.08]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-br from-accent-blue/30 via-accent-purple/20 to-accent-cyan/30" />
                    <span className="absolute inset-0 bg-noise opacity-20" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {person.role}
                    </h3>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                      {person.domain}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {person.bio}
                </p>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1.5 text-foreground/70 transition-colors duration-control ease-soft group-hover:text-foreground">
                    <Linkedin className="h-3.5 w-3.5" />
                    Profile
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-foreground/60 transition-all duration-control ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Hiring senior generative-AI engineers and ML platform leads.{' '}
            <a
              href="/careers"
              className="text-foreground underline-offset-4 hover:underline"
            >
              See open roles →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
