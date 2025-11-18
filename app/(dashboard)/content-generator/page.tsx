import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contentPrompts } from "@/lib/mock-data";

export default function ContentGeneratorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Content Generator</h1>
        <p className="text-sm text-slate-500">
          Spin up scripts, hooks, and outlines tailored to your audience.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div>
            <label className="text-sm font-semibold text-slate-700">Video topic</label>
            <Input placeholder="e.g. 5 AI tools for solo creators" className="mt-2" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Optional notes</label>
            <Textarea placeholder="Add must-include talking points, target products, sponsors…" className="mt-2" />
          </div>
          <Button className="w-full sm:w-auto">Generate</Button>
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contentPrompts.map((prompt) => (
          <Card key={prompt} className="border-dashed border-slate-200 bg-slate-50">
            <CardContent className="pt-4 text-sm font-medium text-slate-700">{prompt}</CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

