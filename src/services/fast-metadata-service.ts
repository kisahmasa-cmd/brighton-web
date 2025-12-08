import { getMetaData } from "./metadata-service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const metadataMemoryCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 60 * 1000; // 1 menit

export async function getFastMetadata(path: string) {
  const now = Date.now();
  const cacheEntry = metadataMemoryCache.get(path);

  // 1. memory cache hit
  if (cacheEntry && now - cacheEntry.timestamp < CACHE_TTL) {
    return cacheEntry.data;
  }

  // 2. fetch fresh
  const data = await getMetaData(path);

  // 3. save to memory cache
  metadataMemoryCache.set(path, { data, timestamp: now });

  return data;
}
