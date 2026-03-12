/**
 * commonUrl.ts
 * Central config file for all base URLs and API endpoints.
 * Import from here to avoid hardcoding or repeating URLs anywhere in the project.
 */

// ─── Base URLs ─────────────────────────────────────────────────────────────

/** HubSpot CRM API base URL (server-side only — do NOT expose token client-side) */
export const HUBSPOT_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.hubapi.com/crm/v3/";

// ─── HubSpot Endpoints ─────────────────────────────────────────────────────

/** Full URL for creating/managing HubSpot contacts */
export const HUBSPOT_CONTACTS_URL = `${HUBSPOT_BASE_URL}objects/contacts`;

// ─── Local Next.js API Routes ──────────────────────────────────────────────

/** Local Next.js API route for submitting enquiry form data */
export const LOCAL_ENQUIRY_URL = "/api/enquiry";

/** Local Next.js API route for submitting notification form data */
export const LOCAL_NOTIFY_URL = "/api/notify";
