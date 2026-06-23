export default function KpiSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="rounded-xl border bg-white p-5 shadow-sm"
                >
                    <div className="mb-3 h-4 w-24 animate-pulse rounded bg-slate-200" />

                    <div className="h-8 w-20 animate-pulse rounded bg-slate-200" />
                </div>
            ))}
        </div>
    );
}