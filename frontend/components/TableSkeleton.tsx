export default function TableSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <table className="w-full">
                <thead className="bg-slate-100">
                    <tr>
                        {Array.from({ length: 7 }).map((_, index) => (
                            <th key={index} className="px-4 py-4">
                                <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {Array.from({ length: 8 }).map((_, row) => (
                        <tr key={row} className="border-t">
                            {Array.from({ length: 7 }).map((_, col) => (
                                <td key={col} className="px-4 py-4">
                                    <div className="h-4 animate-pulse rounded bg-slate-200" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}