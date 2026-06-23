"use client";

import { TrendPoint } from "@/lib/types";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area,
} from "recharts";

interface TrendChartProps {
    data: TrendPoint[];
}

function CustomTooltip({
    active,
    payload,
    label,
}: any) {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
            <p className="mb-2 font-semibold text-slate-800">
                {label}
            </p>

            <div className="space-y-1 text-sm">
                <p className="text-blue-600">
                    Total Mentions:{" "}
                    <span className="font-semibold">
                        {payload[0]?.value}
                    </span>
                </p>

                <p className="text-green-600">
                    Brand Mentioned:{" "}
                    <span className="font-semibold">
                        {payload[1]?.value}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default function TrendChart({
    data,
}: TrendChartProps) {
    const totalMentions = data.reduce(
        (sum, item) => sum + item.total,
        0
    );

    const totalMentioned = data.reduce(
        (sum, item) => sum + item.mentioned,
        0
    );

    const mentionRate =
        totalMentions > 0
            ? (
                (totalMentioned / totalMentions) *
                100
            ).toFixed(1)
            : 0;

    const peakDay = [...data].sort(
        (a, b) => b.total - a.total
    )[0];

    return (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Mention Trends
                </h2>

                <p className="text-sm text-slate-500">
                    Total mentions vs brand mentions over
                    time
                </p>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                        Total Mentions
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                        {totalMentions}
                    </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                        Mention Rate
                    </p>

                    <p className="mt-1 text-2xl font-bold text-green-600">
                        {mentionRate}%
                    </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                        Peak Period
                    </p>

                    <p className="mt-1 text-lg font-bold">
                        {peakDay?.date ?? "-"}
                    </p>
                </div>
            </div>

            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <LineChart data={data}>
                    <defs>
                        <linearGradient
                            id="mentionsGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#2563eb"
                                stopOpacity={0.25}
                            />
                            <stop
                                offset="95%"
                                stopColor="#2563eb"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="4 4"
                        stroke="#e2e8f0"
                    />

                    <XAxis
                        dataKey="date"
                        tick={{
                            fontSize: 12,
                        }}
                    />

                    <YAxis
                        tick={{
                            fontSize: 12,
                        }}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                    />

                    <Legend />

                    <Area
                        type="monotone"
                        dataKey="total"
                        fill="url(#mentionsGradient)"
                        stroke="none"
                    />

                    <Line
                        type="monotone"
                        dataKey="total"
                        name="Total Mentions"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="mentioned"
                        name="Brand Mentioned"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}