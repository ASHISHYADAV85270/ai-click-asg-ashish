import { Info } from "lucide-react";

interface KpiCardsProps {
    totalMentions: number;
    mentionedCount: number;
    avgPosition: number;
    positiveCount: number;
}

export default function KpiCards({
    totalMentions,
    mentionedCount,
    avgPosition,
    positiveCount,
}: KpiCardsProps) {
    const mentionRate =
        totalMentions > 0
            ? ((mentionedCount / totalMentions) * 100).toFixed(1)
            : "0";

    const positiveRate =
        totalMentions > 0
            ? ((positiveCount / totalMentions) * 100).toFixed(1)
            : "0";

    const cards = [
        {
            title: "Total Mentions",
            value: totalMentions,
            description: "Tracked AI responses",
        },
        {
            title: "Mention Rate",
            value: `${mentionRate}%`,
            description: "Brand appeared in responses",
        },
        {
            title: "Avg Position",
            value: avgPosition.toFixed(1),
            description: "Average visibility rank",
        },
        {
            title: "Positive Sentiment",
            value: `${positiveRate}%`,
            description: "Positive brand mentions",
        },
    ];

    return (
        <>
            <div className="mb-4 flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">
                    Dashboard Metrics
                </h2>

                <div className="group relative">
                    <Info className="h-4 w-4 cursor-help text-slate-400 transition-colors group-hover:text-blue-600" />

                    <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 hidden w-80 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600 shadow-xl group-hover:block">
                        Metrics are currently calculated from the records displayed
                        in the table. In a production environment, these would be
                        calculated across the entire filtered dataset using a
                        dedicated analytics endpoint.
                    </div>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-6
                        shadow-sm
                        transition-all
                        duration-200
                        hover:-translate-y-1
                        hover:border-blue-200
                        hover:shadow-lg
                    "
                    >
                        <p className="text-sm font-medium text-slate-500">
                            {card.title}
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-slate-800">
                            {card.value}
                        </h2>

                        <p className="mt-2 text-xs text-slate-400">
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}