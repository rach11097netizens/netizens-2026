import { HUBSPOT_BASE_URL } from "@/config/commonUrl";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  // Relative paths (e.g. /api/enquiry) → local Next.js routes, used as-is.
  // Absolute URLs (http/https) → passed through unchanged.
  // Everything else → prefixed with HUBSPOT_BASE_URL from commonUrl.
  const url =
    endpoint.startsWith("/") || endpoint.startsWith("http")
      ? endpoint
      : `${HUBSPOT_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // console.log("[apiRequest] →", options.method || "GET", url);

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    // console.log("[apiRequest] ← Status:", response.status, "| Response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error: unknown) {
    console.error("[apiRequest] ✗ Error:", error instanceof Error ? error.message : error);
    throw error;
  }
}
