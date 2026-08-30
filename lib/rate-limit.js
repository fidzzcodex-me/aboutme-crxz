const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;
const hits = new Map();

// This is per-instance only. On Vercel each cold start gets a fresh Map, and
// concurrent instances don't share state. It stops basic spam/retry loops
// but is not a substitute for a real rate limiter (e.g. Upstash) if abuse
// becomes an actual problem.
export function isRateLimited(key) {
  const now = Date.now();
  const timestamps = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return false;
}
