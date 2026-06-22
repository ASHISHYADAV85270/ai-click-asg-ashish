"use client";

// TODO: Build a Brand Mentions Dashboard with:
//
// 1. A mentions table with pagination
//    - Show: query_text, model, mentioned (yes/no), position, sentiment, citation_url, date
//    - Paginate through results
//
// 2. Filter controls
//    - Model dropdown (chatgpt, claude, gemini, perplexity)
//    - Sentiment dropdown (positive, neutral, negative)
//    - Date range inputs
//
// 3. A trend chart (line or bar)
//    - Show total mentions vs. mentioned=true over time
//    - Use recharts or any charting library
//
// 4. Loading and empty states
//
// API base URL: http://localhost:8000
// See /lib/types.ts for request/response types

"use client";

import { useEffect, useState } from "react";

import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import MentionsTable from "@/components/MentionsTable";

import { Mention, TrendPoint } from "@/lib/types";
import { getMentions, getTrends } from "@/services/mentions.api";
import Filters from "@/components/Filters";
import TrendChart from "@/components/TrendChart";

export default function Dashboard() {
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const perPage = 7;
  const [total, setTotal] = useState(0);

  const [model, setModel] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [trendData, setTrendData] = useState<
    TrendPoint[]
>([]);

  useEffect(() => {
    fetchData();
    fetchTrendData();
  }, [
    page,
    model,
    sentiment,
    dateFrom,
    dateTo,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    model,
    sentiment,
    dateFrom,
    dateTo,
  ]);
  const fetchData = async () => {
    try {
      setLoading(true);

      const data = await getMentions({
        page,
        per_page: perPage,
        filters: {
          ...(model && { model }),
          ...(sentiment && { sentiment }),
          ...(dateFrom && {
            date_from: dateFrom,
          }),
          ...(dateTo && {
            date_to: dateTo,
          }),
        },
      });
      setMentions(data.data);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendData = async () => {
    const response = await getTrends({
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
        group_by: "day",
    });

    setTrendData(response.data);
};

  const totalPages = Math.ceil(
    total / perPage
  );

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold">
          Brand Mentions Dashboard
        </h1>

        <TrendChart data={trendData} />
        <Filters
          model={model}
          sentiment={sentiment}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onModelChange={setModel}
          onSentimentChange={setSentiment}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          onClear={() => {
            setModel("");
            setSentiment("");
            setDateFrom("");
            setDateTo("");
            setPage(1);
          }}
        />
        {loading ? (
          <LoadingState />
        ) : mentions.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <MentionsTable mentions={mentions} />

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </main>
  );
}
