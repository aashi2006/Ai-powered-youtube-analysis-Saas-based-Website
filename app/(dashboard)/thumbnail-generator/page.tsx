import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { generatedThumbnails } from "@/lib/mock-data";

export default function ThumbnailGeneratorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">AI Thumbnail Generator</h1>
        <p className="text-sm text-slate-500">Upload context, then generate on-brand thumbnails in seconds.</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">Video title</label>
                <Input placeholder="Enter a working video title..." className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Description / outline</label>
                <Textarea placeholder="Add timestamps, hooks, or creative constraints..." className="mt-2" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">Upload reference image</label>
                <Input type="file" className="mt-2 cursor-pointer" />
                <p className="mt-1 text-xs text-slate-400">PNG or JPG up to 5MB.</p>
              </div>
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                Need a look reference? Drop your best-performing thumbnail or a style screenshot. We’ll match lighting,
                palette, and typography automatically.
              </div>
            </div>
          </div>
          <Separator />
          <Button className="w-full sm:w-auto">Generate thumbnails</Button>
        </CardContent>
      </Card>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Generated variations</h2>
            <p className="text-sm text-slate-500">Refresh to explore new lighting, fonts, and compositions.</p>
          </div>
          <Button variant="outline">Download all</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {generatedThumbnails.map((thumb) => (
            <Card key={thumb.id} className="overflow-hidden">
              <div className="relative h-44 w-full">
                <Image src={thumb.url} alt={thumb.title} fill className="object-cover" />
              </div>
              <CardContent className="pt-4">
                <p className="text-sm font-medium text-slate-900">{thumb.title}</p>
                <p className="text-xs text-slate-500">CTR simulator: +12.4%</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

