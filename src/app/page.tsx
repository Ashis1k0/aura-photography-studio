import { HeroSection } from "@/components/hero/HeroSection";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data/services";
import { getCategoryList, getFeaturedImages } from "@/lib/google-drive/provider";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const featuredImages = await getFeaturedImages(6);
  const categories = getCategoryList();

  return (
    <div className="flex flex-col space-y-24 sm:space-y-36 pb-24">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Works Showcase */}
      <section
        aria-label="Featured Photography"
        className="max-w-7xl mx-auto px-6 sm:px-8 w-full"
      >
        <SectionHeading
          badge="Curated Showcase"
          title="Selected Editorial Works"
          subtitle="A glimpse into recent destination unions, character studies, and couture visual essays."
          action={
            <Button href="/portfolio" variant="outline" size="sm">
              Explore All Collections &rarr;
            </Button>
          }
        />
        <PortfolioGrid images={featuredImages} />
      </section>

      {/* 3. Category Explorer */}
      <section
        aria-label="Portfolio Categories"
        className="max-w-7xl mx-auto px-6 sm:px-8 w-full"
      >
        <SectionHeading
          badge="Disciplines"
          title="The Collections"
          subtitle="Explore our dedicated galleries spanning intimate unions, high-fashion editorials, and architectural space."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/portfolio/${cat.slug}`}
              className={`group relative overflow-hidden bg-surface border border-surface-border aspect-[4/5] flex flex-col justify-end p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                idx === 0 ? "sm:col-span-2 lg:col-span-2 aspect-[16/9]" : ""
              }`}
            >
              <Image
                src={cat.coverImage}
                alt={`${cat.name} collection cover`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />

              <div className="relative z-10">
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-2 block">
                  Collection 0{cat.order}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-normal tracking-tight group-hover:text-gold transition-colors duration-300">
                  {cat.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-ivory-muted font-light line-clamp-2 max-w-md">
                  {cat.description}
                </p>
                <div className="mt-4 flex items-center space-x-2 text-xs uppercase tracking-widest text-ivory group-hover:text-gold transition-colors">
                  <span>View Gallery</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Editorial Narrative / Philosophy Statement */}
      <section
        aria-label="Philosophy"
        className="bg-surface border-y border-surface-border py-24 sm:py-32"
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium block">
            Artistic Philosophy
          </span>
          <blockquote className="font-serif text-2xl sm:text-4xl lg:text-5xl text-ivory font-normal leading-[1.25]">
            &ldquo;We do not manufacture moments. We listen to the light, honor the quiet gravity of human emotion, and sculpt heirlooms meant to outlive us.&rdquo;
          </blockquote>
          <p className="text-sm sm:text-base text-ivory-muted font-light leading-relaxed max-w-2xl mx-auto">
            Founded on the principle that true luxury lies in authentic restraint. Every commission is treated with the precision of high-fashion editorial direction and the heart of documentary storytelling.
          </p>
          <div className="pt-4">
            <Button href="/about" variant="primary" size="md">
              Learn More About Our Philosophy
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials & Social Proof */}
      <section
        aria-label="Client Praise"
        className="max-w-7xl mx-auto px-6 sm:px-8 w-full"
      >
        <SectionHeading
          badge="Words of Gratitude"
          title="Client Reflections"
          subtitle="Read honest reflections from couples, creative directors, and families we have had the honor of documenting."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.slice(0, 2).map((test) => (
            <div
              key={test.id}
              className="p-8 sm:p-12 bg-surface border border-surface-border flex flex-col justify-between space-y-8"
            >
              <blockquote className="font-serif text-lg sm:text-xl text-ivory font-light italic leading-relaxed">
                &ldquo;{test.quote}&rdquo;
              </blockquote>
              <div className="border-t border-surface-border pt-6 flex items-center justify-between">
                <div>
                  <span className="font-serif text-base text-ivory block font-normal">
                    {test.client}
                  </span>
                  <span className="text-xs text-ivory-dim font-light">
                    {test.roleOrEvent} &bull; {test.location}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-widest text-gold font-mono">
                  {test.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Conversion CTA Section */}
      <section
        aria-label="Ready to Commission"
        className="max-w-7xl mx-auto px-6 sm:px-8 w-full"
      >
        <div className="p-10 sm:p-16 lg:p-20 bg-gradient-to-b from-surface-elevated to-surface border border-gold/20 flex flex-col items-center text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
            2026 &bull; 2027 Commission Bookings
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory max-w-2xl font-normal leading-tight">
            Reserve your date with the atelier.
          </h2>
          <p className="text-sm sm:text-base text-ivory-muted font-light max-w-xl leading-relaxed">
            To maintain our standard of uncompromised personal dedication, we accept a limited number of destination weddings and editorial commissions each year.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <Button href="/contact" variant="gold" size="lg">
              Inquire For Availability
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Explore Our Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
