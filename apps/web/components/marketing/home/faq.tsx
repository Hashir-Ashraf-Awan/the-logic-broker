import { SectionHeader } from '@/components/primitives/section-header';
import { Reveal } from '@/components/primitives/reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const QUESTIONS = [
  {
    q: 'How is The Logic Broker different from a typical consultancy?',
    a: 'We do not produce slides for a living. Every engagement ships working software to production, with senior engineers embedded in your team. Strategy and delivery are the same conversation.',
  },
  {
    q: 'What does a typical engagement look like?',
    a: 'Discovery (two weeks) → strategy (two weeks) → build (8–16 weeks) → deploy and harden. We work in two-week iterations with weekly demos, and you own the code from day one.',
  },
  {
    q: 'Which stack do you work in?',
    a: 'We meet you where you are. We have shipped on AWS, GCP, and Azure; Python and TypeScript day-to-day; Postgres, Redis, Kafka, and most major vector and ML platforms. We prefer your stack to ours.',
  },
  {
    q: 'How do you measure success?',
    a: 'Each engagement starts with a metric tree — leading and lagging indicators tied to a financial outcome. We refuse engagements where the success metric is "a working model." It must be a business result.',
  },
  {
    q: 'What about security and compliance?',
    a: 'We work inside your VPC. We sign DPAs, BAAs, and SOC 2 attestations. We have shipped in regulated environments (healthcare, finance, public sector) and the operating model carries over.',
  },
  {
    q: 'Do you take equity?',
    a: 'Occasionally, and only for engagements where the cap table makes sense for both sides. Our default is fixed-fee or T&M. We do not do contingency work.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="section">
      <div className="container-wide">
        <SectionHeader
          align="center"
          eyebrow="09 / FAQ"
          title={
            <>
              Questions we hear <span className="text-gradient">on the first call</span>.
            </>
          }
          intro="If yours is not here, the contact form is the fastest route. We answer everything ourselves."
        />

        <Reveal>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible defaultValue="q-0">
              {QUESTIONS.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`q-${i}`}
                  className="mb-3 last:mb-0"
                >
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
