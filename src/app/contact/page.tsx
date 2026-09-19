import { ContactInquiryForm } from "@/components/forms/ContactInquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Bookings",
  description:
    "Inquire about availability for destination weddings, couture campaigns, and private editorial portrait commissions worldwide.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 sm:px-8">
      <SectionHeading
        badge="Initiate Commission"
        title="Connect With The Atelier"
        subtitle="We invite you to share your story, event location, and visual inspirations with us."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Studio Information */}
        <div className="lg:col-span-5 space-y-10">
          <div>
            <h3 className="font-serif text-2xl text-ivory mb-3">
              The Commission Journey
            </h3>
            <p className="text-sm text-ivory-muted font-light leading-relaxed">
              We approach every client as a singular artistic collaboration. Once your inquiry is received, we review our calendar and prepare a personalized visual proposal detailing our scope, dates, and lookbook.
            </p>
          </div>

          <div className="p-8 bg-surface border border-surface-border space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold block mb-1">
                Direct Inquiries
              </span>
              <a
                href="mailto:inquiries@aura-atelier.com"
                className="text-base text-ivory hover:text-gold transition-colors font-serif"
              >
                inquiries@aura-atelier.com
              </a>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-gold block mb-1">
                Phone & WhatsApp
              </span>
              <a
                href="tel:+919820000000"
                className="text-base text-ivory hover:text-gold transition-colors font-mono text-sm"
              >
                +91 (0) 98200 00000
              </a>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-gold block mb-1">
                Studio Bases
              </span>
              <p className="text-sm text-ivory-muted font-light">
                Worli Sea Face, Mumbai &bull; Rue Saint-Honoré, Paris
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-gold block mb-1">
                Response Cadence
              </span>
              <p className="text-sm text-ivory-muted font-light">
                Within 24 to 48 hours for all domestic and international inquiries.
              </p>
            </div>
          </div>

          {/* Quick FAQ */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-ivory font-medium">
              Common Questions
            </h4>
            <div className="space-y-3 text-xs text-ivory-muted font-light">
              <p>
                <strong className="text-ivory font-serif block text-sm">Do you travel internationally?</strong>
                Yes, more than 60% of our weddings and editorial shoots take place outside our home studios. Travel logistics and accommodations are coordinated transparently.
              </p>
              <p>
                <strong className="text-ivory font-serif block text-sm">How far in advance should we book?</strong>
                For peak destination wedding season, we recommend reaching out 6 to 12 months in advance.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7">
          <ContactInquiryForm />
        </div>
      </div>
    </div>
  );
}
