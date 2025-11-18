import { Brain, CreditCard, Image as ImageIcon, Rocket, Search, TrendingUp } from "lucide-react";
import { LucideIcon } from "lucide-react";

export const heroStats = {
  videosAnalyzed: "2,847",
  thumbnailsGenerated: "126",
};

export type AiTool = {
  title: string;
  description: string;
  lastUsed: string;
  href: string;
  icon: LucideIcon;
};

export const aiTools: AiTool[] = [
  {
    title: "AI Thumbnail Generator",
    description: "Craft scroll-stopping thumbnails in seconds.",
    lastUsed: "2 hours ago",
    href: "/thumbnail-generator",
    icon: ImageIcon,
  },
  {
    title: "Thumbnail Search",
    description: "Find winning inspiration across YouTube.",
    lastUsed: "4 hours ago",
    href: "/thumbnail-search",
    icon: Search,
  },
  {
    title: "Content Generator",
    description: "Generate scripts, hooks, and descriptions.",
    lastUsed: "1 hour ago",
    href: "/content-generator",
    icon: Brain,
  },
  {
    title: "Trending Keywords",
    description: "Discover keywords your audience is chasing.",
    lastUsed: "35 minutes ago",
    href: "/trending-keywords",
    icon: TrendingUp,
  },
  {
    title: "Outlier Videos",
    description: "Spot hidden winners to double-down fast.",
    lastUsed: "12 minutes ago",
    href: "/outlier-videos",
    icon: Rocket,
  },
  {
    title: "Billing & Pricing",
    description: "Manage usage, invoices, and team plans.",
    lastUsed: "1 day ago",
    href: "/billing",
    icon: CreditCard,
  },
];

export const bottomStats = [
  {
    label: "Accuracy rate",
    value: "98.1%",
    helper: "Model QA verified this week",
  },
  {
    label: "Keywords found",
    value: "412",
    helper: "Unique, ready for upload",
  },
  {
    label: "Viral videos",
    value: "27",
    helper: "In the last 30 days",
  },
  {
    label: "Revenue boost",
    value: "+38%",
    helper: "Against last quarter benchmark",
  },
];

export const generatedThumbnails = [
  {
    id: 1,
    title: "NYC Secrets",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Daily Reset",
    url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "AI Hustle",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Creator Desk",
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Productivity Lab",
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "Studio Setup",
    url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
  },
];

export const popularSearches = [
  "AI thumbnails",
  "Gaming",
  "Tech reviews",
  "Cooking",
  "Fitness",
  "Education",
];

export const thumbnailSearchResults = [
  {
    id: "gaming",
    title: "Level 50 Speedrun",
    views: "1.2M views",
    url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "tech",
    title: "iPad Pro Review",
    views: "860K views",
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cooking",
    title: "15-min Meals",
    views: "640K views",
    url: "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fitness",
    title: "Desk Stretch Flow",
    views: "412K views",
    url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
  },
];

export const contentPrompts = [
  "AI content creation tools",
  "YouTube growth strategies",
  "Tech product review",
  "Cooking tutorial",
  "Fitness workout routine",
];

export const keywordTrends = [
  {
    keyword: "ai thumbnail hacks",
    direction: "up",
    volume: "24.4K",
    updated: "2 min ago",
  },
  {
    keyword: "mrbeast style edits",
    direction: "up",
    volume: "18.2K",
    updated: "5 min ago",
  },
  {
    keyword: "productivity desk setup",
    direction: "flat",
    volume: "11.3K",
    updated: "10 min ago",
  },
  {
    keyword: "no talking cooking",
    direction: "up",
    volume: "9.4K",
    updated: "14 min ago",
  },
  {
    keyword: "apartment makeover",
    direction: "down",
    volume: "7.1K",
    updated: "23 min ago",
  },
];

export const outlierVideos = [
  {
    title: "Studio reset: 5am edit",
    views: "912K",
    ctr: "9.1%",
    outlierScore: "1.32x",
    trend: "up",
  },
  {
    title: "AI capsule unboxing",
    views: "1.4M",
    ctr: "6.7%",
    outlierScore: "0.92x",
    trend: "flat",
  },
  {
    title: "Desk stretch follow-along",
    views: "640K",
    ctr: "8.4%",
    outlierScore: "1.18x",
    trend: "up",
  },
  {
    title: "Creator income report",
    views: "312K",
    ctr: "5.1%",
    outlierScore: "0.74x",
    trend: "down",
  },
];

export const usageMetrics = [
  {
    label: "Thumbnails generated",
    value: 3,
    limit: 5,
  },
  {
    label: "Keyword searches",
    value: 7,
    limit: 10,
  },
  {
    label: "Content generations",
    value: 1,
    limit: 2,
  },
  {
    label: "API calls (Pro feature)",
    value: 0,
    limit: 0,
    locked: true,
  },
];

export type PricingPlan = {
  name: string;
  price: string;
  cadence: "Monthly" | "Yearly";
  features: string[];
  highlight?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "Monthly",
    features: [
      "5 thumbnail generations",
      "10 keyword searches",
      "Basic analytics",
      "2 content generations",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    cadence: "Monthly",
    highlight: true,
    features: [
      "Unlimited everything",
      "Priority support",
      "Custom branding removal",
      "API access",
      "Bulk operations",
    ],
  },
];

export const billingHistory = [
  {
    type: "Pro plan renewal",
    date: "Nov 01, 2025",
    amount: "$29.00",
    status: "Paid",
  },
  {
    type: "Add-on: Workspace seats",
    date: "Oct 16, 2025",
    amount: "$12.00",
    status: "Paid",
  },
  {
    type: "Pro plan renewal",
    date: "Oct 01, 2025",
    amount: "$29.00",
    status: "Paid",
  },
];

