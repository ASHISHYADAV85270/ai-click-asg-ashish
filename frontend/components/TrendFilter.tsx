import React from 'react'

const TrendFilter = ({ groupBy, setGroupBy }: { groupBy: "day" | "week", setGroupBy: (groupBy: "day" | "week") => void }) => {
    return (
        <div className="flex rounded-xl border border-slate-300 overflow-hidden">
            <button
                onClick={() => setGroupBy("day")}
                className={`flex-1 px-4 py-2 text-sm font-medium transition ${groupBy === "day"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-slate-600 hover:bg-slate-50"
                    }`}
            >
                Daily
            </button>

            <button
                onClick={() => setGroupBy("week")}
                className={`flex-1 px-4 py-2 text-sm font-medium transition ${groupBy === "week"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-slate-600 hover:bg-slate-50"
                    }`}
            >
                Weekly
            </button>
        </div>
    )
}

export default TrendFilter