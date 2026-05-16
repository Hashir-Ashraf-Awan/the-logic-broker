'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface ClientLogoData {
  /** Display name; also used as alt text and wordmark fallback. */
  name: string;
  /**
   * Optional path to a logo SVG/PNG in /public (e.g. "/clients/telenor.svg").
   * When unset (or when the image fails to load), renders the styled wordmark
   * instead — see /public/clients/README.md for the drop-in flow.
   */
  src?: string;
  /** Optional width hint for the image (px). Defaults to 110. */
  width?: number;
}

/**
 * Renders a client logo as an image when `src` is provided, otherwise falls
 * back to a styled wordmark. Falls back cleanly if the image fails to load.
 *
 * The wordmark fallback is intentional — using just the company name in our
 * own type is a respected design choice (cf. Stripe, Linear, Vercel) and
 * keeps the marquee shipping while you source brand-approved assets.
 */
export function ClientLogo({
  logo,
  className,
}: {
  logo: ClientLogoData;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const showImage = logo.src && !errored;

  return (
    <span
      className={cn(
        'inline-flex h-8 select-none items-center text-foreground/40 transition-colors duration-control ease-soft hover:text-foreground/80',
        className,
      )}
      aria-label={logo.name}
    >
      {showImage ? (
        <Image
          src={logo.src!}
          alt={logo.name}
          width={logo.width ?? 110}
          height={32}
          className="h-7 w-auto opacity-80 transition-opacity duration-control ease-soft hover:opacity-100"
          onError={() => setErrored(true)}
          // SVG logos are usually < 10KB; no need to defer below the fold for marquee.
          priority={false}
        />
      ) : (
        <span className="whitespace-nowrap font-display text-xl font-medium tracking-tight md:text-2xl">
          {logo.name}
        </span>
      )}
    </span>
  );
}
