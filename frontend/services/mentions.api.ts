import {
    MentionsResponse,
} from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getMentions(payload: any) {
    console.log("API URL:", API_URL);
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

export async function getTrends(payload: {
    date_from?: string;
    date_to?: string;
    group_by: "day" | "week";
}) {
    const response = await fetch(
        "http://localhost:8000/mentions/trends",
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