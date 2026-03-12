// ─── Types ────────────────────────────────────────────────────────────────────

interface HubSpotContactPayload {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    companyName: string;
    companyWebsite: string;
    services: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BASE_URL = "https://api.hubapi.com/crm/v3";

function headers() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
    };
}

// ─── Step 1: Create or update contact ────────────────────────────────────────

async function upsertContact(payload: HubSpotContactPayload): Promise<string | null> {
    const [firstname, ...rest] = payload.name.trim().split(" ");
    const lastname = rest.join(" ") || "";

    try {
        const res = await fetch(`${BASE_URL}/objects/contacts`, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify({
                properties: {
                    firstname,
                    lastname,
                    email: payload.email,
                    phone: `${payload.countryCode}${payload.phone}`,
                    company: payload.companyName,
                    website: payload.companyWebsite,
                },
            }),
        });

        // 409 = contact already exists — fetch existing contact id
        if (res.status === 409) {
            const searchRes = await fetch(`${BASE_URL}/objects/contacts/search`, {
                method: "POST",
                headers: headers(),
                body: JSON.stringify({
                    filterGroups: [{
                        filters: [{
                            propertyName: "email",
                            operator: "EQ",
                            value: payload.email,
                        }],
                    }],
                }),
            });
            const searchData = await searchRes.json();
            return searchData?.results?.[0]?.id ?? null;
        }

        const data = await res.json();
        return data?.id ?? null;
    } catch (err) {
        console.error("HubSpot upsertContact error:", err);
        return null;
    }
}

// ─── Step 2: Create a deal ────────────────────────────────────────────────────

async function createDeal(
    payload: HubSpotContactPayload,
    contactId: string
): Promise<string | null> {
    try {
        const res = await fetch(`${BASE_URL}/objects/deals`, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify({
                properties: {
                    dealname: `Discovery Call — ${payload.companyName}`,
                    pipeline: "default",
                    dealstage: "appointmentscheduled", // "New" stage in HubSpot default pipeline
                    amount: "",
                    closedate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
                    description: `Services interested in: ${payload.services.join(", ")}\nWebsite: ${payload.companyWebsite}`,
                },
            }),
        });

        const data = await res.json();
        const dealId = data?.id ?? null;

        // ── Step 3: Associate deal with contact ───────────────────────────
        if (dealId && contactId) {
            await fetch(
                `${BASE_URL}/objects/deals/${dealId}/associations/contacts/${contactId}/3`,
                {
                    method: "PUT",
                    headers: headers(),
                }
            );
        }

        return dealId;
    } catch (err) {
        console.error("HubSpot createDeal error:", err);
        return null;
    }
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function pushToHubSpot(payload: HubSpotContactPayload): Promise<boolean> {
    const contactId = await upsertContact(payload);

    if (!contactId) {
        console.error("HubSpot: failed to create/find contact");
        return false;
    }

    const dealId = await createDeal(payload, contactId);

    if (!dealId) {
        console.error("HubSpot: failed to create deal");
        return false;
    }

    console.log(`HubSpot: contact ${contactId}, deal ${dealId} created`);
    return true;
}