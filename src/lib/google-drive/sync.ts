import { PortfolioCategory, PortfolioImage, PortfolioProject } from "@/types";
import { setCachedPortfolio } from "./cache";
import { listFolderImages } from "./files";
import { getConfiguredCategoryFolders, listSubfolders } from "./folders";
import { DriveSyncResult } from "./types";

export async function syncGoogleDriveContent(): Promise<DriveSyncResult> {
  const categoryFolders = getConfiguredCategoryFolders();

  if (categoryFolders.length === 0) {
    return {
      lastSyncTime: new Date().toISOString(),
      totalImages: 0,
      categories: {
        wedding: 0,
        "pre-wedding": 0,
        birthday: 0,
        portrait: 0,
        fashion: 0,
        events: 0,
        commercial: 0,
      },
      source: "seed-fallback",
      error: "No Google Drive folder IDs configured",
    };
  }

  const allImages: PortfolioImage[] = [];
  const allProjects: PortfolioProject[] = [];
  const categoryCounts: Record<PortfolioCategory, number> = {
    wedding: 0,
    "pre-wedding": 0,
    birthday: 0,
    portrait: 0,
    fashion: 0,
    events: 0,
    commercial: 0,
  };

  for (const catFolder of categoryFolders) {
    const category = catFolder.category;

    // 1. Fetch direct images in category folder
    const directImages = await listFolderImages(catFolder.id, category);
    allImages.push(...directImages);
    categoryCounts[category] = (categoryCounts[category] || 0) + directImages.length;

    // 2. Discover nested project folders (e.g., Wedding/Aarav & Priya)
    const subfolders = await listSubfolders(catFolder.id, category);
    for (const sub of subfolders) {
      const projectImages = await listFolderImages(
        sub.id,
        category,
        sub.id,
        sub.projectSlug
      );

      if (projectImages.length > 0) {
        allImages.push(...projectImages);
        categoryCounts[category] = (categoryCounts[category] || 0) + projectImages.length;

        // Construct project model
        const coverImage = projectImages[0];
        allProjects.push({
          id: `project-${sub.id}`,
          slug: sub.projectSlug || sub.name.toLowerCase().replace(/\s+/g, "-"),
          title: sub.name,
          category,
          tagline: `Curated ${category} collection documented with fine art sensitivity.`,
          story: `An editorial visual narrative captured across the ${sub.name} session.`,
          coverImage,
          images: projectImages,
          featured: true,
        });
      }
    }
  }

  // Update in-memory cache
  setCachedPortfolio({
    images: allImages,
    projects: allProjects,
  });

  return {
    lastSyncTime: new Date().toISOString(),
    totalImages: allImages.length,
    categories: categoryCounts,
    source: "google-drive",
  };
}
