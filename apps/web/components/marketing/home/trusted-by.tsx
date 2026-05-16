import { Reveal } from '@/components/primitives/reveal';
import { ClientLogo, type ClientLogoData } from '@/components/primitives/client-logo';

/**
 * Infinite marquee of client wordmarks. CSS keyframe (`animate-marquee`) is
 * configured in the Tailwind preset; the track is duplicated so it loops
 * seamlessly. Mask-faded edges and pause-on-hover.
 *
 * Each client renders as a styled wordmark by default. To swap in a real
 * logo, drop the file into apps/web/public/clients/ and set the matching
 * `src` below — see public/clients/README.md for the workflow and the legal
 * note on trademark permissions.
 */

const CLIENTS: ClientLogoData[] = [
  { name: 'Telenor' /*, src: '/clients/telenor.svg' */ },
  { name: 'Jazz' /*, src: '/clients/jazz.svg' */ },
  { name: 'PTCL' /*, src: '/clients/ptcl.svg' */ },
  { name: 'MindBridge' /*, src: '/clients/mindbridge.svg' */ },
  { name: 'Uber' /*, src: '/clients/uber.svg' */ },
  { name: 'Zyn' /*, src: '/clients/zyn.svg' */ },
  { name: 'Philip Morris' /*, src: '/clients/philip-morris.svg' */ },
];

export function TrustedBy() {
  // Doubled list so the second half scrolls in while the first scrolls out.
  const track = [...CLIENTS, ...CLIENTS];

  return (
    <section className="section -mt-8 md:-mt-12">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow mb-8 text-center">
            Trusted by teams shipping AI and data in production
          </p>
        </Reveal>
        <div
          className="group relative mx-auto max-w-6xl overflow-hidden mask-fade-x"
          aria-label="Selected clients"
          role="region"
        >
          <div className="flex w-max animate-marquee items-center gap-14 [animation-play-state:running] group-hover:[animation-play-state:paused]">
            {track.map((client, i) => (
              <ClientLogo key={`${client.name}-${i}`} logo={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
