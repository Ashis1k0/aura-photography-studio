import { z } from "zod";

export const inquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be under 80 characters")
    .trim(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(100, "Email must be under 100 characters")
    .trim(),
  phone: z
    .string()
    .min(7, "Please provide a valid phone or WhatsApp number")
    .max(25, "Phone number is too long")
    .regex(/^[+0-9\s\-()]+$/, "Phone number format is invalid")
    .trim(),
  service: z
    .string()
    .min(1, "Please select an area of service"),
  eventDate: z
    .string()
    .max(50, "Date format is too long")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .max(120, "Location must be under 120 characters")
    .optional()
    .or(z.literal("")),
  budgetRange: z
    .string()
    .max(60, "Budget range format invalid")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(15, "Please tell us a little more about your story or vision (at least 15 characters)")
    .max(2000, "Message cannot exceed 2000 characters")
    .trim(),
  websiteHoneypot: z
    .string()
    .max(0, "Bot submission detected")
    .optional()
    .or(z.literal("")),
});

export type InquirySchemaType = z.infer<typeof inquirySchema>;
