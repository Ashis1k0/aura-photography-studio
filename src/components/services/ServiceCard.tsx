import { ServiceItem } from "@/types";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/Button";

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const isEven = index % 2 === 0;

  return (
    <article className="py-16 sm:py-24 border-b border-surface-border last:border-b-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Visual Hero */}
        <div
          className={`lg:col-span-5 relative aspect-[4/5] bg-surface overflow-hidden border border-surface-border ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <Image
            src={service.heroImage}
            alt={`${service.title} experience visual`}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/85 backdrop-blur-md border border-surface-border text-[10px] uppercase tracking-[0.25em] text-gold">
            0{index + 1} &bull; {service.category}
          </div>
        </div>

        {/* Content & Details */}
        <div
          className={`lg:col-span-7 flex flex-col justify-center space-y-6 ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-2 block">
              Experience &bull; {service.category}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-normal leading-tight">
              {service.title}
            </h3>
            <p className="mt-3 text-base sm:text-lg text-ivory font-light italic">
              &ldquo;{service.tagline}&rdquo;
            </p>
          </div>

          <p className="text-sm sm:text-base text-ivory-muted font-light leading-relaxed">
            {service.description}
          </p>

          {/* Deliverables */}
          <div className="pt-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-ivory font-medium mb-4">
              Curated Deliverables
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-ivory-muted">
                  <span className="text-gold font-mono text-xs mt-0.5">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process Timeline */}
          <div className="pt-4 border-t border-surface-border">
            <h4 className="text-xs uppercase tracking-[0.2em] text-ivory font-medium mb-4">
              Our Process
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {service.process.map((step) => (
                <div key={step.step} className="p-4 bg-surface border border-surface-border">
                  <span className="font-mono text-xs text-gold block mb-1">{step.step}</span>
                  <h5 className="font-serif text-sm text-ivory font-normal mb-1">{step.title}</h5>
                  <p className="text-xs text-ivory-dim font-light leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 flex items-center space-x-4">
            <Button
              href={`/contact?service=${service.category}`}
              variant="gold"
              size="md"
            >
              Inquire For This Experience
            </Button>
            <Button href="/portfolio" variant="outline" size="md">
              View Portfolio
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
