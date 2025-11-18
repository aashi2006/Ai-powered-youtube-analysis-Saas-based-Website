import { FeatureCard } from "@/components/FeatureCard";
import { GradientCard } from "@/components/GradientCard";
import { StatsCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { heroStats, aiTools, bottomStats } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <GradientCard
        title="Welcome to TubePulse"
        subtitle="Your AI-powered YouTube analytics and optimization hub"
        className="overflow-hidden"
      >
        <div className="grid gap-4 text-white sm:grid-cols-2">
          <Card className="border-white/30 bg-white/10 text-white shadow-none backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Total videos analyzed</p>
            <p className="mt-3 text-4xl font-semibold">{heroStats.videosAnalyzed}</p>
          </Card>
          <Card className="border-white/30 bg-white/10 text-white shadow-none backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Total thumbnails generated</p>
            <p className="mt-3 text-4xl font-semibold">{heroStats.thumbnailsGenerated}</p>
          </Card>
        </div>
      </GradientCard>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">AI Tools & Features</h2>
            <p className="text-sm text-slate-500">Everything you need to launch high-performing videos.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {aiTools.map((tool) => (
            <FeatureCard key={tool.title} {...tool} />
          ))}
        </div>
      </section>

      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bottomStats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>
    </div>
  );
}

