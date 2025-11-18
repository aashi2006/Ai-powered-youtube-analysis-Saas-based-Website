import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatsCardProps = {
  label: string;
  value: string;
  helper: string;
  className?: string;
};

export function StatsCard({ label, value, helper, className }: StatsCardProps) {
  return (
    <Card className={cn("border-slate-100 bg-slate-50", className)}>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{helper}</p>
    </Card>
  );
}

