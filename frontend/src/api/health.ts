import { apiFetch } from "./client";

export type HealthResponse = {
  status: string;
  service: string;
};

export async function getHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>("/api/v1/health");
}
