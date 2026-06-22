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
}: FiltersProps) {
    return (
        <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Filters
                </h2>

                <button
                    onClick={onClear}
                    className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                >
                    Clear Filters
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Model
                    </label>

                    <select
                        value={model}
                        onChange={(e) =>
                            onModelChange(e.target.value)
                        }
                        className="w-full rounded-lg border p-2"
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
                        className="w-full rounded-lg border p-2"
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
                        onChange={(e) =>
                            onDateFromChange(
                                e.target.value
                            )
                        }
                        className="w-full rounded-lg border p-2"
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
                        className="w-full rounded-lg border p-2"
                    />
                </div>
            </div>
        </div>
    );
}