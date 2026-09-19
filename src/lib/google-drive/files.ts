import { PortfolioCategory, PortfolioImage } from "@/types";
import { getGoogleDriveAuth } from "./client";
import { DriveFileItem } from "./types";

export const SUPPORTED_IMAGE_MIMES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

/**
 * Clean and humanize a filename into an editorial title.
 * E.g., "01-aarav-priya-sunset-vows.jpg" -> "Aarav Priya Sunset Vows"
 */
export function formatImageTitle(fileName: string): string {
  const withoutExt = fileName.replace(/\.[^/.]+$/, "");
  const withoutLeadingNumbers = withoutExt.replace(/^[0-9_-]+/, "");
  const humanized = withoutLeadingNumbers
    .replace(/[-_]+/g, " ")
    .trim();

  if (!humanized) return withoutExt;
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Normalizes a Drive file into the application's PortfolioImage model.
 */
export function normalizeDriveImage(
  file: DriveFileItem,
  category: PortfolioCategory,
  projectId?: string,
  projectSlug?: string
): PortfolioImage {
  const title = formatImageTitle(file.name);
  const width = file.imageMediaMetadata?.width || 1800;
  const height = file.imageMediaMetadata?.height || 1200;

  // Direct Google Drive image stream URL
  const highResUrl = `https://lh3.googleusercontent.com/d/${file.id}=w${Math.min(width, 2400)}`;
  const thumbUrl = file.thumbnailLink || `https://lh3.googleusercontent.com/d/${file.id}=w600`;

  return {
    id: `gdrive-${file.id}`,
    name: title,
    category,
    projectId,
    projectSlug,
    url: highResUrl,
    thumbnailUrl: thumbUrl,
    width,
    height,
    alt: `${title} - ${category.charAt(0).toUpperCase() + category.slice(1)} photography`,
    caption: file.description || undefined,
    modifiedTime: file.modifiedTime,
  };
}

/**
 * Lists image files from a given Google Drive folder.
 */
export async function listFolderImages(
  folderId: string,
  category: PortfolioCategory,
  projectId?: string,
  projectSlug?: string
): Promise<PortfolioImage[]> {
  const auth = await getGoogleDriveAuth();
  if (!auth.isConfigured) return [];

  try {
    const mimeQuery = SUPPORTED_IMAGE_MIMES.map((m) => `mimeType = '${m}'`).join(" or ");
    const query = encodeURIComponent(
      `'${folderId}' in parents and (${mimeQuery}) and trashed = false`
    );
    const fields = encodeURIComponent(
      "files(id,name,mimeType,trashed,thumbnailLink,webContentLink,imageMediaMetadata,description,modifiedTime)"
    );
    let url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&pageSize=100&orderBy=createdTime desc`;

    const headers: Record<string, string> = {};
    if (auth.type === "service_account" && auth.token) {
      headers["Authorization"] = `Bearer ${auth.token}`;
    } else if (auth.type === "api_key" && auth.apiKey) {
      url += `&key=${auth.apiKey}`;
    }

    const res = await fetch(url, { headers, next: { revalidate: 3600 } });
    if (!res.ok) {
      console.warn(`[Google Drive] Error fetching files for folder ${folderId}: ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    const files: DriveFileItem[] = data.files || [];

    return files.map((f) => normalizeDriveImage(f, category, projectId, projectSlug));
  } catch (err) {
    console.warn(`[Google Drive] Exception listing folder ${folderId}:`, err);
    return [];
  }
}
