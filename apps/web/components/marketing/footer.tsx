import Link from 'next/link';
import { Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { Logo } from './logo';
import { NewsletterForm } from './newsletter-form';
import { SITE } from '@/lib/utils';

const COLS = [
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/careers', label: 'Careers' },
      { href: '/case-studies', label: 'Case studies' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { href: '/services#ai-automation', label: 'AI automation' },
      { href: '/services#machine-learning', label: 'Machine learning' },
      { href: '/services#generative-ai', label: 'Generative AI' },
      { href: '/services#workflow-automation', label: 'Workflow automation' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/ai-solutions', label: 'AI solutions' },
      { href: '/pricing', label: 'Pricing' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy policy' },
      { href: '/terms', label: 'Terms & conditions' },
    ],
  },
];

const SOCIALS = [
  { href: 'https://www.linkedin.com/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://twitter.com/', label: 'Twitter / X', icon: Twitter },
  { href: 'https://github.com/', label: 'GitHub', icon: Github },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-background-2/40">
      <div className="container-wide pt-24 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.5fr,2fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
            <div className="mt-8">
              <p className="eyebrow mb-3">Newsletter</p>
              <NewsletterForm />
            </div>
            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-foreground/80 transition-all duration-control ease-soft hover:scale-105 hover:bg-white/[0.08] hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {COLS.map((col) => (
              <div key={col.heading}>
                <p className="eyebrow mb-4">{col.heading}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1 text-sm text-foreground/80 transition-colors duration-control ease-soft hover:text-foreground"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3 w-3 -translate-y-px opacity-0 transition-all duration-control ease-soft group-hover:translate-x-0.5 group-hover:opacity-60" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            Built with intention. Shipped with rigour.
          </p>
        </div>
      </div>
    </footer>
  );
}
