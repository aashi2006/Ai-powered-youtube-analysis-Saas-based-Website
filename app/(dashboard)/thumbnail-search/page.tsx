import Image from "next/image";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { popularSearches, thumbnailSearchResults } from "@/lib/mock-data";

export default function ThumbnailSearchPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Thumbnail Search</h1>
        <p className="text-sm text-slate-500">
          Search for trending thumbnails by topic, keyword, or channel.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="relative">
            <Input
              placeholder="Search for trending thumbnails by topic, keyword, or channel…"
              className="pl-12"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Popular searches</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularSearches.map((item) => (
                <Button key={item} variant="outline" className="rounded-2xl border-slate-200 text-xs font-medium">
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Library</h2>
            <p className="text-sm text-slate-500">See what’s resonating across categories.</p>
          </div>
          <Button variant="outline">Filter</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {thumbnailSearchResults.map((thumb) => (
            <Card key={thumb.id} className="overflow-hidden">
              <div className="relative h-40 w-full">
                <Image src={thumb.url} alt={thumb.title} fill className="object-cover" />
              </div>
              <CardContent className="pt-4">
                <p className="text-sm font-semibold text-slate-900">{thumb.title}</p>
                <p className="text-xs text-slate-500">{thumb.views}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

