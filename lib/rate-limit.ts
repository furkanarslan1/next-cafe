type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

export const rateLimit = {
  check(limit: number, key: string): { isRateLimited: boolean } {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 dakika

    const entry = store.get(key);

    if (!entry || now > entry.resetAt) {
      store.set(key, { count: 1, resetAt: now + windowMs });
      return { isRateLimited: false };
    }

    if (entry.count >= limit) {
      return { isRateLimited: true };
    }

    entry.count++;
    return { isRateLimited: false };
  },
};
