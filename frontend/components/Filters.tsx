interface FiltersProps {
    model: string;
    sentiment: string;
    dateFrom: string;
    dateTo: string;

    onModelChange: (value: string) => void;
    onSentimentChange: (value: string) => void;
    onDateFromChange: (value: string) => void;
    onDateToChange: (value: string) => void;

    onClear: () => void;

    searchQuery: string;
    onSearchQueryChange: (value: string) => void;
}

export default function Filters({
    model,
    sentiment,
    dateFrom,
    dateTo,
    onModelChange,
    onSentimentChange,
    onDateFromChange,
    onDateToChange,
    onClear,
    searchQuery,
    onSearchQueryChange,
}: FiltersProps) {
    return (
        <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                        Filters
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Refine mentions by model, sentiment, and date range
                    </p>
                </div>

                <button
                    onClick={onClear}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:cursor-pointer"
                >
                    Clear Filters
                </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Search Query
                    </label>

                    <input
                        type="text"
                        value={searchQuery}
                        placeholder="Search mentions..."
                        onChange={(e) =>
                            onSearchQueryChange(e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 shadow-sm transition-all outline-none hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Model
                    </label>


                    <select
                        value={model}
                        onChange={(e) => onModelChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 shadow-sm transition-all outline-none hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                        <option value="">
                            All Models
                        </option>
                        <option value="chatgpt">
                            ChatGPT
                        </option>
                        <option value="claude">
                            Claude
                        </option>
                        <option value="gemini">
                            Gemini
                        </option>
                        <option value="perplexity">
                            Perplexity
                        </option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Sentiment
                    </label>

                    <select
                        value={sentiment}
                        onChange={(e) =>
                            onSentimentChange(
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 shadow-sm transition-all outline-none hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                        <option value="">
                            All Sentiments
                        </option>
                        <option value="positive">
                            Positive
                        </option>
                        <option value="neutral">
                            Neutral
                        </option>
                        <option value="negative">
                            Negative
                        </option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        From Date
                    </label>

                    <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => onDateFromChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 shadow-sm transition-all outline-none hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        To Date
                    </label>

                    <input
                        type="date"
                        value={dateTo}
                        onChange={(e) =>
                            onDateToChange(
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 shadow-sm transition-all outline-none hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                </div>
            </div>
        </div>
    );
}