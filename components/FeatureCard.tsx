import Link from "next/link";
import { LucideIcon, MoveRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  title: string;
  description: string;
  lastUsed: string;
  href: string;
  icon: LucideIcon;
  className?: string;
};

export function FeatureCard({
  title,
  description,
  lastUsed,
  href,
  icon: Icon,
  className,
}: FeatureCardProps) {
  return (
    <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 rounded-2xl">
      <Card className={cn("h-full hover:scale-[1.01] hover:shadow-xl", className)}>
        <CardHeader className="flex flex-row items-center gap-3">
          <span className="rounded-2xl bg-orange-50 p-3 text-orange-500">
            <Icon className="h-5 w-5" />
          </span>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>{description}</CardDescription>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Last used: {lastUsed}</span>
            <MoveRight className="h-4 w-4 text-slate-400" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

