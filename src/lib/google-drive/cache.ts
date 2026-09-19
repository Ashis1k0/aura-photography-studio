import { CachedPortfolioData } from "./types";

interface CacheStore {
  data: CachedPortfolioData | null;
  lastUpdated: number;
}

const globalCache: CacheStore = {
  data: null,
  lastUpdated: 0,
};

export function getCacheTTL(): number {
  const envTtl = process.env.GOOGLE_DRIVE_CACHE_TTL;
  if (envTtl) {
    const parsed = parseInt(envTtl, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed * 1000;
  }
  return 60 * 60 * 1000; // 1 hour default
}

export function getCachedPortfolio(): CachedPortfolioData | null {
  if (!globalCache.data) return null;
  const now = Date.now();
  const ttl = getCacheTTL();

  if (now - globalCache.lastUpdated > ttl) {
    // Stale but retained for graceful fallback
    return globalCache.data;
  }

  return globalCache.data;
}

export function isCacheStale(): boolean {
  if (!globalCache.data) return true;
  return Date.now() - globalCache.lastUpdated > getCacheTTL();
}

export function setCachedPortfolio(data: Omit<CachedPortfolioData, "timestamp">): void {
  globalCache.data = {
    ...data,
    timestamp: Date.now(),
  };
  globalCache.lastUpdated = Date.now();
}

export function invalidatePortfolioCache(): void {
  globalCache.data = null;
  globalCache.lastUpdated = 0;
}
