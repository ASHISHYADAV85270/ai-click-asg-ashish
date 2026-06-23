interface ActiveFiltersProps {
    model: string;
    sentiment: string;
    dateFrom: string;
    dateTo: string;
    searchQuery: string;

    onRemoveModel: () => void;
    onRemoveSentiment: () => void;
    onRemoveDateFrom: () => void;
    onRemoveDateTo: () => void;
    onRemoveSearch: () => void;
}



const modelLabels: Record<string, string> = {
    chatgpt: "🤖 ChatGPT",
    claude: "🧠 Claude",
    gemini: "✨ Gemini",
    perplexity: "🔎 Perplexity",
};

const sentimentLabels: Record<string, string> = {
    positive: "😊 Positive",
    neutral: "😐 Neutral",
    negative: "😞 Negative",
};
export default function ActiveFilters({
    model,
    sentiment,
    dateFrom,
    dateTo,
    searchQuery,
    onRemoveModel,
    onRemoveSentiment,
    onRemoveDateFrom,
    onRemoveDateTo,
    onRemoveSearch,
}: ActiveFiltersProps) {
    const hasFilters =
        model ||
        sentiment ||
        dateFrom ||
        dateTo ||
        searchQuery;

    if (!hasFilters) return null;

    return (
        <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />

                    <span className="text-sm font-semibold text-slate-700">
                        Active Filters
                    </span>


                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        {[
                            searchQuery,
                            model,
                            sentiment,
                            dateFrom,
                            dateTo,
                        ].filter(Boolean).length}
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {searchQuery && (
                    <FilterChip
                        label={`🔍 ${searchQuery}`}
                        onRemove={onRemoveSearch}
                    />
                )}

                {model && (
                    <FilterChip
                        label={modelLabels[model]}
                        onRemove={onRemoveModel}
                    />
                )}

                {sentiment && (
                    <FilterChip
                        label={sentimentLabels[sentiment]}
                        onRemove={onRemoveSentiment}
                    />
                )}

                {dateFrom && dateTo && (
                    <FilterChip
                        label={`📅 ${dateFrom} → ${dateTo}`}
                        onRemove={() => {
                            onRemoveDateFrom();
                            onRemoveDateTo();
                        }}
                    />
                )}
            </div>
        </div>
    );
}

import { X } from "lucide-react";

function FilterChip({
    label,
    onRemove,
}: {
    label: string;
    onRemove: () => void;
}) {
    return (
        <div
            className="inline-flex items-center gap-2 rounded-xl border  border-blue-200 bg-gradient-to-r  from-blue-50  to-indigo-50 px-3 py-2 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
        >
            <span
                className=" max-w-[220px] truncate text-sm font-medium text-slate-700"
                title={label}
            >
                {label}
            </span>

            <button
                onClick={onRemove}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 transition-all hover:bg-red-100 hover:text-red-600 hover:cursor-pointer"
            >
                <X size={14} strokeWidth={2.5} />
            </button>
        </div>
    );
}