import React from "react";

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
  action,
  className = "",
}: SectionHeadingProps) {
  const alignMap = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-surface-border mb-12 ${className}`}
    >
      <div className={`flex flex-col max-w-2xl ${alignMap[align]}`}>
        {badge && (
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3">
            {badge}
          </span>
        )}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory font-normal tracking-tight leading-[1.15]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-ivory-muted font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 mt-4 md:mt-0">{action}</div>}
    </div>
  );
}
