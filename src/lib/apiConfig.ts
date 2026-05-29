const DEFAULT_API_BASE = "http://localhost:5000/api";

/**
 * Normalizes NEXT_PUBLIC_API_URL to Express backend base (…/api, not …/api/v1).
 * Service paths are relative, e.g. apiClient.get("/products").
 */
export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_BASE;
  let base = raw.replace(/\/+$/, "");

  // Legacy v1 prefix used by older env templates
  if (/\/api\/v1$/i.test(base)) {
    base = base.replace(/\/api\/v1$/i, "/api");
  } else if (/\/v1$/i.test(base)) {
    base = base.replace(/\/v1$/i, "");
  }

  if (/\/api\/api$/i.test(base)) {
    base = base.replace(/\/api\/api$/i, "/api");
  }

  return base || DEFAULT_API_BASE;
}
