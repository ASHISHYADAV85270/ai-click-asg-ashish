interface Props {
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  total,
  perPage,
  onPageChange,
}: Props) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  const pages = [];

  for (
    let i = Math.max(1, page - 2);
    i <= Math.min(totalPages, page + 2);
    i++
  ) {
    pages.push(i);
  }

  return (
    <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-800">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-800">
          {total}
        </span>{" "}
        mentions
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Previous
        </button>

        <div className="flex items-center gap-1">
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() =>
                onPageChange(pageNumber)
              }
              className={`h-10 w-10 rounded-lg text-sm font-medium transition ${page === pageNumber
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}