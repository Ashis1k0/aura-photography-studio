import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/data/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Experiences",
  description:
    "Explore our dedicated photography commissions across destination weddings, pre-wedding romance, haute couture fashion, and character portraits.",
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 sm:px-8">
      <SectionHeading
        badge="Offerings"
        title="Services & Experiences"
        subtitle="Each commission is custom-tailored with bespoke creative direction, comprehensive coverage, and heirloom archival deliverables."
      />

      {/* Services List */}
      <div>
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Bottom Conversion Section */}
      <div className="mt-24 p-12 sm:p-16 bg-surface border border-gold/30 text-center flex flex-col items-center space-y-6 max-w-4xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
          Custom Commissions
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-ivory">
          Looking for a custom bespoke experience?
        </h3>
        <p className="text-sm sm:text-base text-ivory-muted max-w-lg font-light leading-relaxed">
          From multi-week international wedding tours to multi-city campaign shoots, we create tailored packages suited to your specific requirements.
        </p>
        <Button href="/contact" variant="gold" size="lg">
          Inquire For Custom Commission
        </Button>
      </div>
    </div>
  );
}
