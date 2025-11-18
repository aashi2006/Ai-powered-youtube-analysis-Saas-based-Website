import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fef7f1] via-white to-[#f3f6ff] text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row lg:px-6 lg:py-10">
        <Sidebar />
        <main className="flex-1 rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          {children}
        </main>
      </div>
    </div>
  );
}

