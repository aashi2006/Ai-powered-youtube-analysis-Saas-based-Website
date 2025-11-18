import { Lock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type UsageProgressProps = {
  label: string;
  value: number;
  limit: number;
  locked?: boolean;
};

export function UsageProgress({ label, value, limit, locked }: UsageProgressProps) {
  const percent = limit === 0 ? 0 : (value / limit) * 100;
  return (
    <Card className="bg-white">
      <div className="flex items-center justify-between text-sm font-medium text-slate-600">
        <span>{label}</span>
        {locked ? (
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Lock className="h-3.5 w-3.5" /> Locked
          </span>
        ) : (
          <span className="text-xs text-slate-400">
            {value}/{limit}
          </span>
        )}
      </div>
      <div className="mt-4">
        <Progress value={locked ? 0 : percent} />
      </div>
    </Card>
  );
}

