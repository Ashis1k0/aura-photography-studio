"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { ServiceItem } from "@/types";
import { MagneticButton } from "@/components/motion/MagneticButton";

interface ServiceChapterProps {
  service: ServiceItem;
  index: number;
}

export function ServiceChapter({ service, index }: ServiceChapterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.15 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-surface-border border-b border-surface-border last:border-b-0 mb-0"
    >
      {/* Image panel */}
      <motion.div
        initial={{ clipPath: isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }}
        animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[540px] bg-surface overflow-hidden ${
          isEven ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <motion.div
          initial={{ scale: 1.08 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        {/* Chapter label */}
        <div className="absolute top-6 left-6 z-10">
          <span className="inline-block px-3 py-1.5 bg-background/75 backdrop-blur-sm text-[9px] uppercase tracking-[0.3em] text-gold border border-gold/20">
            0{index + 1} · {service.category}
          </span>
        </div>

        {/* Quote overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/90 to-transparent">
          <p className="font-serif text-lg text-ivory-muted italic font-light">
            &ldquo;{service.tagline}&rdquo;
          </p>
        </div>
      </motion.div>

      {/* Content panel */}
      <div
        className={`bg-background p-10 lg:p-14 xl:p-16 flex flex-col justify-center gap-8 ${
          isEven ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-normal leading-tight mb-4">
            {service.title}
          </h2>
          <p className="text-sm text-ivory-muted font-light leading-relaxed">
            {service.description}
          </p>
        </motion.div>

        {/* Deliverables — clean list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-gold block mb-4">
            What&rsquo;s Included
          </span>
          <ul className="space-y-2">
            {service.deliverables.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ivory-muted font-light">
                <span className="text-gold text-[10px] mt-1 shrink-0">◆</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Process steps */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-4 pt-2 border-t border-surface-border"
        >
          {service.process.slice(0, 4).map((step) => (
            <div key={step.step}>
              <span className="font-mono text-[9px] text-gold tracking-widest block mb-1">{step.step}</span>
              <span className="font-serif text-sm text-ivory block">{step.title}</span>
              <p className="text-[11px] text-ivory-dim font-light leading-relaxed mt-0.5">{step.description}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MagneticButton>
            <Link
              href={`/contact?service=${service.category}`}
              data-cursor="open"
              className="inline-flex text-[10px] uppercase tracking-[0.25em] border border-gold/40 text-gold px-7 py-3.5 hover:bg-gold hover:text-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Inquire About {service.title.split(" ")[0]}
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </motion.div>
  );
}
