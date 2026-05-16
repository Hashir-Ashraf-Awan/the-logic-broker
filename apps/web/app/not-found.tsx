import Link from 'next/link';
import { AnimatedGradient } from '@/components/primitives/animated-gradient';
import { MagneticButton } from '@/components/primitives/magnetic-button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden">
      <AnimatedGradient className="opacity-60" />
      <div className="container-wide relative text-center">
        <p className="eyebrow mb-5">404</p>
        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          We don&apos;t have a page <span className="text-gradient">there</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted-foreground">
          The link might be old, or the page may have moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton href="/" iconRight={<ArrowLeft className="h-4 w-4" />}>
            Back to home
          </MagneticButton>
          <Link
            href="/contact"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Tell us what you were looking for
          </Link>
        </div>
      </div>
    </section>
  );
}
