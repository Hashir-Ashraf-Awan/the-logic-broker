import { PageShell } from '@/components/marketing/page-shell';
import { ContactForm } from '@/components/marketing/contact-form';
import { buildMetadata } from '@/lib/seo';
import { SITE } from '@/lib/utils';

export const metadata = buildMetadata({
  title: 'Contact',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Tell us where you want AI to land."
      intro="Most engagements begin with a 30-minute call. We listen, sketch the shape, and tell you honestly whether we are the right partner."
    >
      <section className="section pt-0">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr,1.2fr]">
          <div>
            <p className="eyebrow mb-3">Direct</p>
            <a
              href={`mailto:${SITE.email}`}
              className="font-display text-2xl tracking-tight text-foreground transition-opacity duration-control ease-soft hover:opacity-80"
            >
              {SITE.email}
            </a>
            <p className="mt-10 max-w-sm text-sm text-muted-foreground">
              Or use the form — it routes to the same inbox and we respond within
              one business day, usually faster.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </PageShell>
  );
}
