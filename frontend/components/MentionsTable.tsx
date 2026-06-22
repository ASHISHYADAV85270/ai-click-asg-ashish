import { Mention } from "@/lib/types";

interface Props {
  mentions: Mention[];
}

export default function MentionsTable({
  mentions,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">
              Query
            </th>
            <th className="px-4 py-3 text-left">
              Model
            </th>
            <th className="px-4 py-3 text-left">
              Mentioned
            </th>
            <th className="px-4 py-3 text-left">
              Position
            </th>
            <th className="px-4 py-3 text-left">
              Sentiment
            </th>
            <th className="px-4 py-3 text-left">
              Citation
            </th>
            <th className="px-4 py-3 text-left">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {mentions.map((mention) => (
            <tr
              key={mention.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3">
                {mention.query_text}
              </td>

              <td className="px-4 py-3">
                {mention.model}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    mention.mentioned
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {mention.mentioned
                    ? "Mentioned"
                    : "Not Mentioned"}
                </span>
              </td>

              <td className="px-4 py-3">
                {mention.position ?? "-"}
              </td>

              <td className="px-4 py-3">
                {mention.sentiment ?? "-"}
              </td>

              <td className="px-4 py-3">
                {mention.citation_url ? (
                  <a
                    href={mention.citation_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Open
                  </a>
                ) : (
                  "-"
                )}
              </td>

              <td className="px-4 py-3">
                {new Date(
                  mention.created_at
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}