import React from "react";
import { CalendarDays, CalendarRange } from "lucide-react";

interface TrendFilterProps {
    groupBy: "day" | "week";
    setGroupBy: (groupBy: "day" | "week") => void;
}

export default function TrendFilter({
    groupBy,
    setGroupBy,
}: TrendFilterProps) {
    return (
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 shadow-sm">
            <button
                onClick={() => setGroupBy("day")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${groupBy === "day"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                    }`}
            >
                <CalendarDays className="h-4 w-4" />
                Daily
            </button>

            <button
                onClick={() => setGroupBy("week")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${groupBy === "week"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                    }`}
            >
                <CalendarRange className="h-4 w-4" />
                Weekly
            </button>
        </div>
    );
}