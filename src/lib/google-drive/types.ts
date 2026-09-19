import { PortfolioCategory, PortfolioImage, PortfolioProject } from "@/types";

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  trashed?: boolean;
  parents?: string[];
  thumbnailLink?: string;
  webContentLink?: string;
  webViewLink?: string;
  imageMediaMetadata?: {
    width?: number;
    height?: number;
    rotation?: number;
    time?: string;
  };
  description?: string;
  modifiedTime: string;
}

export interface DriveFolderItem {
  id: string;
  name: string;
  category: PortfolioCategory;
  isProjectFolder?: boolean;
  projectSlug?: string;
}

export interface DriveSyncResult {
  lastSyncTime: string;
  totalImages: number;
  categories: Record<PortfolioCategory, number>;
  source: "google-drive" | "seed-fallback";
  error?: string;
}

export interface CachedPortfolioData {
  timestamp: number;
  images: PortfolioImage[];
  projects: PortfolioProject[];
}
