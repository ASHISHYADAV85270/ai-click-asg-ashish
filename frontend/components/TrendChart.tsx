"use client";

import { TrendPoint } from "@/lib/types";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface TrendChartProps {
    data: TrendPoint[];
}

export default function TrendChart({
    data,
}: TrendChartProps) {
    return (
        <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4">
                <h2 className="text-lg font-semibold">
                    Mention Trends
                </h2>

                <p className="text-sm text-gray-500">
                    Total mentions vs brand mentions over
                    time
                </p>
            </div>

            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="total"
                        name="Total Mentions"
                        stroke="#2563eb"
                        strokeWidth={3}
                    />

                    <Line
                        type="monotone"
                        dataKey="mentioned"
                        name="Brand Mentioned"
                        stroke="#16a34a"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}