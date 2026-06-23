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
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import MentionsTable from "@/components/MentionsTable";
import KpiCards from "@/components/dashboard/KpiCards";

import { Mention, TrendPoint } from "@/lib/types";
import { getMentions, getTrends } from "@/services/mentions.api";
import Filters from "@/components/Filters";
import TrendChart from "@/components/TrendChart";
import TrendFilter from "@/components/TrendFilter";
import { useDebounce } from "@/components/hooks/useDebounce";

export default function Dashboard() {

  const router = useRouter();
  const searchParams = useSearchParams();


  const [mentions, setMentions] = useState<Mention[]>([]);
  const [loading, setLoading] = useState(true);


  const perPage = 10;
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");

  const [model, setModel] = useState(searchParams.get("model") || "");

  const [sentiment, setSentiment] = useState(searchParams.get("sentiment") || "");

  const [dateFrom, setDateFrom] = useState(searchParams.get("dateFrom") || "");

  const [dateTo, setDateTo] = useState(searchParams.get("dateTo") || "");


  const [trendData, setTrendData] = useState<TrendPoint[]>([]);

  const debouncedQuery = useDebounce(searchQuery);

  const [groupBy, setGroupBy] =
    useState<"day" | "week">(
      (
        searchParams.get(
          "groupBy"
        ) as "day" | "week"
      ) || "day"
    );

  useEffect(() => {
    const params =
      new URLSearchParams();

    if (debouncedQuery) {
      params.set("query", debouncedQuery);
    }

    if (model)
      params.set("model", model);

    if (sentiment)
      params.set(
        "sentiment",
        sentiment
      );

    if (dateFrom)
      params.set(
        "dateFrom",
        dateFrom
      );

    if (dateTo)
      params.set("dateTo", dateTo);

    if (groupBy !== "day")
      params.set(
        "groupBy",
        groupBy
      );

    if (page > 1)
      params.set(
        "page",
        page.toString()
      );

    router.replace(
      `?${params.toString()}`,
      { scroll: false }
    );
  }, [
    debouncedQuery,
    model,
    sentiment,
    dateFrom,
    dateTo,
    page,
    groupBy,
    router,
  ]);

  const hasActiveFilters =
    !!model ||
    !!sentiment ||
    !!dateFrom ||
    !!dateTo;

  const isInvalidDateRange =
    dateFrom &&
    dateTo &&
    new Date(dateFrom) >
    new Date(dateTo);

  useEffect(() => {
    if (isInvalidDateRange) return;
    fetchData();
  }, [
    page,
    model,
    sentiment,
    dateFrom,
    dateTo,
    debouncedQuery,
  ]);

  useEffect(() => {
    if (isInvalidDateRange) return;
    fetchTrendData();
  }, [dateFrom, dateTo, groupBy]);

  useEffect(() => {
    setPage(1);
  }, [
    model,
    sentiment,
    dateFrom,
    dateTo,
    debouncedQuery,
  ]);
  const fetchData = async () => {
    try {
      setLoading(true);

      const data = await getMentions({
        page,
        per_page: perPage,
        filters: {
          ...(debouncedQuery && {
            query: searchQuery,
          }),
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
      group_by: groupBy,
    });

    setTrendData(response.data);
  };

  const totalPages = Math.ceil(
    total / perPage
  );


  const totalMentions = mentions.length;

  const mentionedCount = mentions.filter(
    (m) => m.mentioned
  ).length;

  const positiveCount = mentions.filter(
    (m) => m.sentiment === "positive"
  ).length;

  const positions = mentions
    .filter((m) => m.position !== null)
    .map((m) => m.position!);

  const avgPosition =
    positions.length > 0
      ? positions.reduce((a, b) => a + b, 0) /
      positions.length
      : 0;
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Brand Mentions Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor how AI models talk about your brand
            across ChatGPT, Claude, Gemini, and Perplexity.
          </p>
        </div>

        <KpiCards
          totalMentions={totalMentions}
          mentionedCount={mentionedCount}
          avgPosition={avgPosition}
          positiveCount={positiveCount}
        />
        <br />
        <br />

        <Filters
          model={model}
          sentiment={sentiment}
          dateFrom={dateFrom}
          dateTo={dateTo}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onModelChange={setModel}
          onSentimentChange={setSentiment}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          onClear={() => {
            setSearchQuery("");
            setModel("");
            setSentiment("");
            setDateFrom("");
            setDateTo("");
            setPage(1);
          }}
        />


        <div className="mb-6 mt-4">
          <div className="mb-4">
            <TrendFilter groupBy={groupBy} setGroupBy={setGroupBy} />
          </div>
          {trendData.length > 0 && <TrendChart data={trendData} />}
        </div>



        {loading ? (
          <LoadingState />
        ) : mentions.length === 0 ? (
          <EmptyState hasFilters={hasActiveFilters} onClearFilters={() => {
            setModel("");
            setSentiment("");
            setDateFrom("");
            setDateTo("");
            setPage(1);
          }} />
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
