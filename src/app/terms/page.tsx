import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing commissions and use of Aura Atelier.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 sm:px-8">
      <SectionHeading
        badge="Legal & Transparency"
        title="Terms of Service"
        subtitle="Last revised: September 2026. General terms governing commissions, copyright, and digital delivery."
      />

      <div className="space-y-8 text-sm text-ivory-muted font-light leading-relaxed">
        <section className="space-y-3">
          <h3 className="font-serif text-xl text-ivory font-normal">1. Intellectual Property & Copyright</h3>
          <p>
            All photographs, motion clips, and editorial content displayed on this website are protected under international copyright law and remain the sole artistic property of Aura Atelier. Unauthorized reproduction, commercial distribution, AI model training, or alteration is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-xl text-ivory font-normal">2. Commissions & Bookings</h3>
          <p>
            Inquiries submitted via this website do not constitute a binding booking. Commissions are secured exclusively upon execution of our mutual photography agreement and receipt of the designated retainer deposit.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-xl text-ivory font-normal">3. Deliverables & Archival Policy</h3>
          <p>
            Final master galleries are delivered in high-resolution format with private cloud storage maintained for a minimum period of two (2) calendar years from delivery date.
          </p>
        </section>
      </div>
    </div>
  );
}
