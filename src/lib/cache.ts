const DEFAULT_TTL_SECONDS = 300;

const cache = new Map<string, { data: unknown; expires: number }>();

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCache<T>(
  key: string,
  data: T,
  ttlSeconds: number = DEFAULT_TTL_SECONDS,
): void {
  cache.set(key, {
    data,
    expires: Date.now() + ttlSeconds * 1000,
  });
}

export function clearCache(): void {
  cache.clear();
}
