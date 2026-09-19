"use client";

import { inquirySchema, InquirySchemaType } from "@/lib/validation/inquiry";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";

const SERVICE_OPTIONS = [
  { value: "wedding", label: "Wedding Photography" },
  { value: "pre-wedding", label: "Pre-Wedding / Engagement" },
  { value: "portrait", label: "Editorial / Character Portrait" },
  { value: "fashion", label: "Fashion & Lookbook Campaign" },
  { value: "events", label: "Cultural & Private Events" },
  { value: "birthday", label: "Milestone Celebration / Birthday" },
  { value: "commercial", label: "Commercial & Architecture" },
  { value: "other", label: "Bespoke Commission / Other" },
];

const BUDGET_OPTIONS = [
  { value: "standard", label: "$2,500 – $5,000" },
  { value: "premium", label: "$5,000 – $10,000" },
  { value: "luxury", label: "$10,000 – $20,000" },
  { value: "couture", label: "$20,000+" },
];

export function ContactInquiryForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquirySchemaType>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      eventDate: "",
      location: "",
      budgetRange: "",
      message: "",
      websiteHoneypot: "",
    },
  });

  const onSubmit = async (data: InquirySchemaType) => {
    setSubmitStatus("submitting");
    setServerErrorMessage("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setSubmitStatus("error");
        setServerErrorMessage(json.error || "Something went wrong while submitting your inquiry. Please try again.");
        return;
      }

      setSubmitStatus("success");
      reset();
    } catch (err) {
      console.error("[Inquiry Form] Submission exception:", err);
      setSubmitStatus("error");
      setServerErrorMessage("Network error occurred. Please check your connection or contact us directly via email.");
    }
  };

  if (submitStatus === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-surface border border-gold/30 p-8 sm:p-12 text-center max-w-2xl mx-auto my-8 animate-fade-in"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-gold block mb-3 font-medium">
          Inquiry Received
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-ivory mb-4">
          Thank you for reaching out.
        </h3>
        <p className="text-base text-ivory-muted leading-relaxed font-light mb-8 max-w-lg mx-auto">
          Every story is unique. We review all incoming commissions with great care and will respond with our availability and bespoke lookbook within 24 to 48 hours.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/portfolio" variant="primary" size="md">
            Continue Exploring Work
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => setSubmitStatus("idle")}
          >
            Submit Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-surface border border-surface-border p-6 sm:p-10 lg:p-12 max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium block mb-2">
          Start a Conversation
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-ivory">
          Tell Us About Your Vision
        </h3>
        <p className="text-sm text-ivory-muted mt-2 font-light">
          Whether you are planning an intimate destination wedding, editorial campaign, or studio portrait series, we would love to hear your story.
        </p>
      </div>

      {submitStatus === "error" && (
        <div
          role="alert"
          className="mb-8 p-4 bg-red-950/40 border border-red-800 text-red-200 text-sm animate-fade-in"
        >
          {serverErrorMessage}
        </div>
      )}

      {/* Honeypot field (hidden from genuine users, traps automated bots) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="websiteHoneypot">Leave this blank</label>
        <input
          type="text"
          id="websiteHoneypot"
          tabIndex={-1}
          autoComplete="off"
          {...register("websiteHoneypot")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-xs uppercase tracking-wider text-ivory mb-2">
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Eleanor Vance"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="bg-background border border-surface-border px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            {...register("name")}
          />
          {errors.name && (
            <span id="name-error" role="alert" className="text-xs text-red-400 mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-xs uppercase tracking-wider text-ivory mb-2">
            Email Address <span className="text-gold">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="eleanor@example.com"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="bg-background border border-surface-border px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            {...register("email")}
          />
          {errors.email && (
            <span id="email-error" role="alert" className="text-xs text-red-400 mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-xs uppercase tracking-wider text-ivory mb-2">
            Phone / WhatsApp <span className="text-gold">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="bg-background border border-surface-border px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            {...register("phone")}
          />
          {errors.phone && (
            <span id="phone-error" role="alert" className="text-xs text-red-400 mt-1">
              {errors.phone.message}
            </span>
          )}
        </div>

        {/* Service */}
        <div className="flex flex-col">
          <label htmlFor="service" className="text-xs uppercase tracking-wider text-ivory mb-2">
            Area of Service <span className="text-gold">*</span>
          </label>
          <select
            id="service"
            aria-invalid={errors.service ? "true" : "false"}
            aria-describedby={errors.service ? "service-error" : undefined}
            className="bg-background border border-surface-border px-4 py-3 text-sm text-ivory focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            {...register("service")}
          >
            <option value="">Select an experience...</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <span id="service-error" role="alert" className="text-xs text-red-400 mt-1">
              {errors.service.message}
            </span>
          )}
        </div>

        {/* Event Date */}
        <div className="flex flex-col">
          <label htmlFor="eventDate" className="text-xs uppercase tracking-wider text-ivory mb-2">
            Approximate Date
          </label>
          <input
            id="eventDate"
            type="text"
            placeholder="e.g. October 2026 or Specific Day"
            className="bg-background border border-surface-border px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            {...register("eventDate")}
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label htmlFor="location" className="text-xs uppercase tracking-wider text-ivory mb-2">
            Location / Destination
          </label>
          <input
            id="location"
            type="text"
            placeholder="e.g. Udaipur, Lake Como, Paris..."
            className="bg-background border border-surface-border px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            {...register("location")}
          />
        </div>

        {/* Budget Range */}
        <div className="sm:col-span-2 flex flex-col">
          <label htmlFor="budgetRange" className="text-xs uppercase tracking-wider text-ivory mb-2">
            Anticipated Investment Range
          </label>
          <select
            id="budgetRange"
            className="bg-background border border-surface-border px-4 py-3 text-sm text-ivory focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            {...register("budgetRange")}
          >
            <option value="">Select investment range...</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="sm:col-span-2 flex flex-col">
          <label htmlFor="message" className="text-xs uppercase tracking-wider text-ivory mb-2">
            Tell Us About Your Celebration or Vision <span className="text-gold">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Describe your story, venue inspirations, aesthetic preferences, or questions..."
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="bg-background border border-surface-border px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-y"
            {...register("message")}
          />
          {errors.message && (
            <span id="message-error" role="alert" className="text-xs text-red-400 mt-1">
              {errors.message.message}
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-ivory-dim">
          We honor your privacy. Your information is strictly confidential.
        </p>
        <Button
          type="submit"
          variant="gold"
          size="lg"
          isLoading={submitStatus === "submitting"}
          className="w-full sm:w-auto"
        >
          Send Inquiry
        </Button>
      </div>
    </form>
  );
}
