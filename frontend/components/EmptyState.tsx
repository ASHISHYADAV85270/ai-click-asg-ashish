interface EmptyStateProps {
    hasFilters?: boolean;
    onClearFilters: () => void;
}

export default function EmptyState({
    hasFilters = false,
    onClearFilters,
}: EmptyStateProps) {
    return (
        <div className="rounded-xl border bg-white py-16 text-center shadow-sm">
            <div className="mx-auto max-w-md">
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                    No mentions found
                </h3>

                <p className="text-gray-500">
                    {hasFilters
                        ? "Try adjusting your filters or selecting a wider date range to see more results."
                        : "There are currently no mentions available."}
                </p>

                <button
                    onClick={onClearFilters}
                    className="mt-4 rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
}