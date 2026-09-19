import { getCategoryList, getPortfolioProjects } from "@/lib/google-drive/provider";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aura-atelier.com";

  // Static core routes
  const staticRoutes = [
    "",
    "/portfolio",
    "/about",
    "/services",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Categories routes
  const categories = getCategoryList();
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/portfolio/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Dynamic projects routes
  const projects = await getPortfolioProjects();
  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/portfolio/project/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...categoryRoutes, ...projectRoutes];
}
