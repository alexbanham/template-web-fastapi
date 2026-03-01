/**
 * Typed API client for backend requests.
 * In dev, use Vite proxy: requests to /api go to backend (localhost:8000).
 * In production, set VITE_API_URL or use same-origin.
 */

const baseUrl = import.meta.env.VITE_API_URL ?? "";

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = `${baseUrl}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
