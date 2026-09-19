import { CATEGORIES, SEED_IMAGES, SEED_PROJECTS } from "@/lib/data/seedPortfolio";
import { CategoryInfo, PortfolioCategory, PortfolioImage, PortfolioProject } from "@/types";
import { getCachedPortfolio, isCacheStale } from "./cache";
import { getGoogleDriveAuth } from "./client";
import { syncGoogleDriveContent } from "./sync";

/**
 * Returns all portfolio images, optionally filtered by category.
 * Integrates Google Drive cache with seamless fallback to curated seed dataset.
 */
export async function getPortfolioImages(
  category?: PortfolioCategory
): Promise<PortfolioImage[]> {
  try {
    const auth = await getGoogleDriveAuth();

    if (auth.isConfigured) {
      if (isCacheStale()) {
        await syncGoogleDriveContent().catch((err) => {
          console.warn("[Portfolio Provider] Background sync error:", err);
        });
      }

      const cached = getCachedPortfolio();
      if (cached && cached.images.length > 0) {
        if (category) {
          return cached.images.filter((img) => img.category === category);
        }
        return cached.images;
      }
    }
  } catch (err) {
    console.warn("[Portfolio Provider] Failed resolving Drive images, serving seed data:", err);
  }

  // Graceful Fallback Mode
  if (category) {
    return SEED_IMAGES.filter((img) => img.category === category);
  }
  return SEED_IMAGES;
}

/**
 * Returns featured images for the homepage editorial hero and showcase.
 */
export async function getFeaturedImages(limit = 6): Promise<PortfolioImage[]> {
  const images = await getPortfolioImages();
  const featured = images.filter((img) => img.featured);
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }
  return images.slice(0, limit);
}

/**
 * Returns portfolio projects, optionally filtered by category.
 */
export async function getPortfolioProjects(
  category?: PortfolioCategory
): Promise<PortfolioProject[]> {
  try {
    const auth = await getGoogleDriveAuth();

    if (auth.isConfigured) {
      const cached = getCachedPortfolio();
      if (cached && cached.projects.length > 0) {
        if (category) {
          return cached.projects.filter((p) => p.category === category);
        }
        return cached.projects;
      }
    }
  } catch (err) {
    console.warn("[Portfolio Provider] Failed resolving Drive projects, serving seed data:", err);
  }

  // Graceful Fallback Mode
  if (category) {
    return SEED_PROJECTS.filter((p) => p.category === category);
  }
  return SEED_PROJECTS;
}

/**
 * Returns a specific project by its URL slug.
 */
export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const projects = await getPortfolioProjects();
  return projects.find((p) => p.slug === slug) || null;
}

/**
 * Returns the category configuration list.
 */
export function getCategoryList(): CategoryInfo[] {
  return CATEGORIES.sort((a, b) => a.order - b.order);
}

/**
 * Returns a specific category by its slug identifier.
 */
export function getCategoryBySlug(slug: string): CategoryInfo | null {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}
