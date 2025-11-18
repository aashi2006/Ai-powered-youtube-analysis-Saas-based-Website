import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { outlierVideos } from "@/lib/mock-data";

export default function OutlierVideosPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Outlier Videos</h1>
        <p className="text-sm text-slate-500">
          Surface high-performing edge cases before they flatten.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-3 pt-6 text-sm text-slate-600">
          <div className="grid grid-cols-5 font-semibold text-slate-400">
            <span>Title</span>
            <span>View count</span>
            <span>CTR</span>
            <span>Outlier score</span>
            <span>Trend</span>
          </div>
          {outlierVideos.map((video) => (
            <div
              key={video.title}
              className="grid grid-cols-5 items-center rounded-2xl border border-slate-100 bg-white px-4 py-3"
            >
              <span className="font-medium text-slate-900">{video.title}</span>
              <span>{video.views}</span>
              <span>{video.ctr}</span>
              <span className="font-semibold text-slate-900">{video.outlierScore}</span>
              <span className="flex items-center gap-1 font-medium">
                {video.trend === "up" && <ArrowUpRight className="h-4 w-4 text-emerald-500" />}
                {video.trend === "down" && <ArrowDownRight className="h-4 w-4 text-rose-500" />}
                {video.trend === "flat" && <Minus className="h-4 w-4 text-slate-400" />}
                <span
                  className={
                    video.trend === "up"
                      ? "text-emerald-500"
                      : video.trend === "down"
                        ? "text-rose-500"
                        : "text-slate-500"
                  }
                >
                  {video.trend === "flat" ? "Stable" : video.trend === "up" ? "Rising" : "Sliding"}
                </span>
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

