'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  CreditCard,
  Image as ImageIcon,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Thumbnail Generator", href: "/thumbnail-generator", icon: ImageIcon },
  { label: "Thumbnail Search", href: "/thumbnail-search", icon: Search },
  { label: "Content Generator", href: "/content-generator", icon: Sparkles },
  { label: "Trending Keywords", href: "/trending-keywords", icon: TrendingUp },
  { label: "Outlier Videos", href: "/outlier-videos", icon: ListChecks },
  { label: "Billing & Pricing", href: "/billing", icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <aside className="sticky top-10 h-fit w-full flex-shrink-0 md:w-64">
      <div className="mb-6 flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-2 shadow-sm md:bg-transparent md:px-1 md:py-0">
        <span className="rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white">
          TubePulse
        </span>
        <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
          beta
        </span>
      </div>
      <Card className="border-0 bg-white p-3 shadow-xl shadow-orange-100/50">
        {session?.user && (
          <div className="mb-4 rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-500">Signed in as</p>
            <p className="text-sm font-semibold text-slate-900 truncate">
              {session.user.name || session.user.email}
            </p>
          </div>
        )}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition",
                  active
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                    : "hover:bg-orange-50 hover:text-slate-900",
                )}
              >
                <span
                  className={cn(
                    "rounded-xl p-2",
                    active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full justify-start gap-3 text-slate-600 hover:text-slate-900"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </Card>
    </aside>
  );
}

