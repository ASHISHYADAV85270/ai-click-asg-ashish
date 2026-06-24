import {
    MentionsResponse, StatsResponse
} from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getMentions(payload: any) {
    const response = await fetch(`${API_URL}/mentions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch mentions");
    }

    return response.json() as Promise<MentionsResponse>;
}

export async function getTrends(payload:any) {
    const response = await fetch(`${API_URL}/mentions/trends`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch trends"
        );
    }

    return response.json();
}

export async function getStats(
    filters: any
): Promise<StatsResponse> {
    const response = await fetch(
        `${API_URL}/mentions/stats`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filters),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch stats"
        );
    }

    return response.json();
}