import * as React from "react";

import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-slate-100",
        className,
      )}
      {...props}
    >
      <span
        className="absolute inset-y-0 left-0 block rounded-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  ),
);
Progress.displayName = "Progress";

export { Progress };

