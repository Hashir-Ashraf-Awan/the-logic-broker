import { SectionHeader } from '@/components/primitives/section-header';
import { getFeaturedTestimonials } from '@/lib/data';
import { TestimonialsCarousel } from './testimonials-carousel';

export async function Testimonials() {
  const items = await getFeaturedTestimonials();

  return (
    <section className="section">
      <div className="container-wide">
        <SectionHeader
          align="center"
          eyebrow="07 / Testimonials"
          title={
            <>
              What partners say <span className="text-gradient">after the launch</span>.
            </>
          }
          intro="The metric we trust most is whether teams want to work with us again. So far, every one has."
        />
        <TestimonialsCarousel items={items} />
      </div>
    </section>
  );
}
