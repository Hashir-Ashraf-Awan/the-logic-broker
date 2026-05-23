import { Linkedin, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/primitives/reveal';
import { SectionHeader } from '@/components/primitives/section-header';

type TeamMember = {
  role: string;
  domain: string;
  bio: string;
  initials: string;
  gradient: string;
};

const TEAM: TeamMember[] = [
  {
    role: 'Founder & Principal',
    domain: 'Data Platforms · Strategy',
    bio: 'Fifteen years building data infrastructure across telecoms, fintech, and consumer goods. Ex-Big Four lead architect.',
    initials: 'FP',
    gradient: 'from-[hsl(217_91%_55%)] via-[hsl(262_83%_55%)] to-[hsl(188_94%_45%)]',
  },
  {
    role: 'Head of AI',
    domain: 'Generative AI · Eval Frameworks',
    bio: 'Author of three production RAG systems running for Fortune-tier clients. Speaks at NeurIPS and writes about evals.',
    initials: 'HA',
    gradient: 'from-[hsl(262_83%_55%)] via-[hsl(330_85%_55%)] to-[hsl(20_90%_55%)]',
  },
  {
    role: 'Engineering Lead',
    domain: 'MLOps · Reliability',
    bio: 'Built the on-call rotation that kept a 99.99% SLA on a 50M-event-per-day fraud system. Believes runbooks are art.',
    initials: 'EL',
    gradient: 'from-[hsl(160_84%_42%)] via-[hsl(188_94%_45%)] to-[hsl(217_91%_55%)]',
  },
  {
    role: 'Director of Delivery',
    domain: 'Programme Management',
    bio: 'Has shipped twenty-plus AI engagements without slipping. The reason your stand-ups are useful and your retros are honest.',
    initials: 'DD',
    gradient: 'from-[hsl(36_95%_55%)] via-[hsl(330_85%_55%)] to-[hsl(262_83%_55%)]',
  },
  {
    role: 'Principal ML Engineer',
    domain: 'Computer Vision · Edge',
    bio: 'PhD in vision systems. Deploys models to factory floors where latency budgets are measured in milliseconds.',
    initials: 'ME',
    gradient: 'from-[hsl(199_94%_55%)] via-[hsl(217_91%_55%)] to-[hsl(243_75%_55%)]',
  },
  {
    role: 'Research Lead',
    domain: 'NLP · Fine-tuning',
    bio: 'Specialises in domain adaptation. Has fine-tuned LLMs on legal, medical, and supply-chain corpora.',
    initials: 'RL',
    gradient: 'from-[hsl(280_80%_55%)] via-[hsl(217_91%_55%)] to-[hsl(160_84%_45%)]',
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
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl surface surface-hover p-7 transition-all duration-control ease-soft hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div
                    aria-hidden
                    className={`relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ring-1 ring-border ${person.gradient}`}
                  >
                    <span className="absolute inset-0 bg-noise opacity-25" />
                    <span className="relative font-display text-lg font-semibold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                      {person.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {person.role}
                    </h3>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/80">
                      {person.domain}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {person.bio}
                </p>
                <div className="mt-auto flex items-center justify-between pt-6 text-sm">
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
