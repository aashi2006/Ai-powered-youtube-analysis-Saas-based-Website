import { TrendingDown, TrendingUp as TrendingUpIcon, Minus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { keywordTrends } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const directionIconMap = {
  up: TrendingUpIcon,
  down: TrendingDown,
  flat: Minus,
} as const;

export default function TrendingKeywordsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Trending Keywords</h1>
        <p className="text-sm text-slate-500">
          Monitor rising search intent before it peaks.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="hidden grid-cols-4 px-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 md:grid">
            <span>Keyword</span>
            <span>Trend</span>
            <span>Search volume</span>
            <span>Last updated</span>
          </div>
          {keywordTrends.map((keyword) => {
            const Icon = directionIconMap[keyword.direction as keyof typeof directionIconMap];
            const color =
              keyword.direction === "up"
                ? "text-emerald-500"
                : keyword.direction === "down"
                  ? "text-rose-500"
                  : "text-slate-400";
            return (
              <div
                key={keyword.keyword}
                className="grid gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-600 md:grid-cols-4"
              >
                <div className="font-semibold text-slate-900">{keyword.keyword}</div>
                <div className="flex items-center gap-2">
                  <Icon className={cn("h-4 w-4", color)} />
                  <span className="text-slate-500">Trend</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">Search volume</p>
                  <p className="text-base font-semibold text-slate-900">{keyword.volume}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">Last updated</p>
                  <p className="text-base font-semibold text-slate-900">{keyword.updated}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

