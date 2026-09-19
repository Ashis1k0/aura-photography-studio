import { PortfolioCategory } from "@/types";
import { getGoogleDriveAuth } from "./client";
import { DriveFolderItem } from "./types";

export const CATEGORY_FOLDER_ENV_MAP: Record<PortfolioCategory, string> = {
  wedding: "GOOGLE_DRIVE_WEDDING_FOLDER_ID",
  "pre-wedding": "GOOGLE_DRIVE_PREWEDDING_FOLDER_ID",
  birthday: "GOOGLE_DRIVE_BIRTHDAY_FOLDER_ID",
  portrait: "GOOGLE_DRIVE_PORTRAIT_FOLDER_ID",
  fashion: "GOOGLE_DRIVE_FASHION_FOLDER_ID",
  events: "GOOGLE_DRIVE_EVENTS_FOLDER_ID",
  commercial: "GOOGLE_DRIVE_COMMERCIAL_FOLDER_ID",
};

/**
 * Returns the configured folder ID for a category.
 */
export function getCategoryFolderId(category: PortfolioCategory): string | undefined {
  const envKey = CATEGORY_FOLDER_ENV_MAP[category];
  return process.env[envKey]?.trim() || undefined;
}

/**
 * Returns all configured category folders.
 */
export function getConfiguredCategoryFolders(): DriveFolderItem[] {
  const folders: DriveFolderItem[] = [];
  const categories = Object.keys(CATEGORY_FOLDER_ENV_MAP) as PortfolioCategory[];

  for (const cat of categories) {
    const folderId = getCategoryFolderId(cat);
    if (folderId) {
      folders.push({
        id: folderId,
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        category: cat,
      });
    }
  }

  return folders;
}

/**
 * Lists subfolders within a parent folder in Google Drive (e.g., nested project folders).
 */
export async function listSubfolders(
  parentFolderId: string,
  category: PortfolioCategory
): Promise<DriveFolderItem[]> {
  const auth = await getGoogleDriveAuth();
  if (!auth.isConfigured) return [];

  try {
    const query = encodeURIComponent(
      `'${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
    );
    let url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)&pageSize=50`;

    const headers: Record<string, string> = {};
    if (auth.type === "service_account" && auth.token) {
      headers["Authorization"] = `Bearer ${auth.token}`;
    } else if (auth.type === "api_key" && auth.apiKey) {
      url += `&key=${auth.apiKey}`;
    }

    const res = await fetch(url, { headers, next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const data = await res.json();
    return (data.files || []).map((f: { id: string; name: string }) => ({
      id: f.id,
      name: f.name,
      category,
      isProjectFolder: true,
      projectSlug: f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    }));
  } catch (err) {
    console.warn(`[Google Drive] Failed listing subfolders for ${parentFolderId}:`, err);
    return [];
  }
}
