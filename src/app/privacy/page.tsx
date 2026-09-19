import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and client data confidentiality standards for Aura Atelier.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 sm:px-8">
      <SectionHeading
        badge="Legal & Transparency"
        title="Privacy Policy"
        subtitle="Last revised: September 2026. We are committed to safeguarding the privacy and personal data of our clients."
      />

      <div className="space-y-8 text-sm text-ivory-muted font-light leading-relaxed">
        <section className="space-y-3">
          <h3 className="font-serif text-xl text-ivory font-normal">1. Information We Collect</h3>
          <p>
            When you submit an inquiry through our website, we collect your name, email address, phone number, approximate event dates, locations, and details about your aesthetic vision. We do not collect payment credentials or sensitive biometric data on this website.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-xl text-ivory font-normal">2. How We Use Your Data</h3>
          <p>
            Your information is exclusively utilized to respond to your inquiry, prepare customized booking proposals, schedule consultations, and fulfill contracted photography services. We never sell, rent, or lease your personal information to third-party brokers.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-xl text-ivory font-normal">3. Image Rights & Client Galleries</h3>
          <p>
            Client private galleries and preview links are strictly encrypted and delivered via secure tokens. We do not publish private family or wedding photographs online without prior explicit consent.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-xl text-ivory font-normal">4. Contact & Inquiries</h3>
          <p>
            If you wish to review, correct, or delete any personal details held by our studio, please contact us directly at:{" "}
            <a href="mailto:privacy@aura-atelier.com" className="text-gold underline">
              privacy@aura-atelier.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
