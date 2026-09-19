export type PortfolioCategory =
  | "wedding"
  | "pre-wedding"
  | "birthday"
  | "portrait"
  | "fashion"
  | "events"
  | "commercial";

export interface CategoryInfo {
  id: PortfolioCategory;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  coverImage: string;
  order: number;
}

export interface PortfolioImage {
  id: string;
  name: string;
  category: PortfolioCategory;
  projectId?: string;
  projectSlug?: string;
  url: string;
  thumbnailUrl?: string;
  blurDataUrl?: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  location?: string;
  featured?: boolean;
  order?: number;
  modifiedTime: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory;
  client?: string;
  date?: string;
  location?: string;
  tagline?: string;
  story?: string;
  coverImage: PortfolioImage;
  images: PortfolioImage[];
  featured?: boolean;
  order?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  tagline: string;
  description: string;
  deliverables: string[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  heroImage: string;
  featuredProjects?: string[];
}

export interface TestimonialItem {
  id: string;
  client: string;
  roleOrEvent: string;
  category: PortfolioCategory;
  quote: string;
  location?: string;
  year?: string;
}

export interface InquiryFormInput {
  name: string;
  email: string;
  phone: string;
  service: string;
  eventDate?: string;
  location?: string;
  budgetRange?: string;
  message: string;
  websiteHoneypot?: string; // Bot protection
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
