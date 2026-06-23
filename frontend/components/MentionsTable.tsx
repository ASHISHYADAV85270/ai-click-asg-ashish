import { Mention } from "@/lib/types";

interface Props {
    mentions: Mention[];
}

export default function MentionsTable({
    mentions,
}: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full">
                <thead className="sticky top-0 z-10 bg-slate-50">
                    <tr className="border-b border-slate-200">
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Query
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Model
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Mentioned
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Position
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Sentiment
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Citation
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Date
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {mentions.map((mention) => (
                        <tr
                            key={mention.id}
                            className=" border-t border-slate-100 odd:bg-white even:bg-slate-50 transition-colors hover:bg-blue-50"
                        >
                            <td className="max-w-sm px-6 py-4">
                                <p
                                    className="truncate font-medium text-slate-800"
                                    title={mention.query_text}
                                >
                                    {mention.query_text}
                                </p>
                            </td>

                            <td className="px-6 py-4">
                                <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                    {mention.model}
                                </span>
                            </td>

                            <td className="px-6 py-4">
                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${mention.mentioned
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {mention.mentioned ? "✓ Yes" : "✕ No"}
                                </span>
                            </td>

                            <td className="px-6 py-4 font-medium text-slate-700">
                                {mention.position ?? "-"}
                            </td>

                            <td className="px-6 py-4">
                                {mention.sentiment ? (
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${mention.sentiment === "positive"
                                            ? "bg-green-100 text-green-700"
                                            : mention.sentiment === "negative"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-slate-100 text-slate-700"
                                            }`}
                                    >
                                        {mention.sentiment}
                                    </span>
                                ) : (
                                    "-"
                                )}
                            </td>

                            <td className="px-6 py-4">
                                {mention.citation_url ? (
                                    <a
                                        href={mention.citation_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                                    >
                                        {new URL(
                                            mention.citation_url
                                        ).hostname.replace("www.", "")}
                                    </a>
                                ) : (
                                    "-"
                                )}
                            </td>

                            <td className="px-6 py-4 text-slate-600">
                                {new Date(mention.created_at).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}