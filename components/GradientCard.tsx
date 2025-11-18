import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type GradientCardProps = {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
  gradient?: "orange" | "blue";
};

const gradientMap: Record<NonNullable<GradientCardProps["gradient"]>, string> = {
  orange: "from-[#ff9a62] via-[#ff5f6d] to-[#ff2d7a]",
  blue: "from-[#82a0ff] via-[#5cc1ff] to-[#32d1ff]",
};

export function GradientCard({
  title,
  subtitle,
  className,
  children,
  gradient = "orange",
}: GradientCardProps) {
  return (
    <Card
      className={cn(
        "border-0 bg-gradient-to-r text-white shadow-xl shadow-orange-200/60",
        gradientMap[gradient],
        className,
      )}
    >
      <div className="space-y-3">
        {title && <h2 className="text-2xl font-semibold">{title}</h2>}
        {subtitle && <p className="text-sm text-white/80">{subtitle}</p>}
      </div>
      {children && <div className="mt-6">{children}</div>}
    </Card>
  );
}

