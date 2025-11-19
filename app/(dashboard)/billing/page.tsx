"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { UsageProgress } from "@/components/UsageProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { billingHistory, pricingPlans, usageMetrics } from "@/lib/mock-data";

type BillingCadence = "Monthly" | "Yearly";

export default function BillingPage() {
  const [cadence, setCadence] = useState<BillingCadence>("Monthly");
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleUpgrade = async (planName: string) => {
    if (planName === "Free") {
      return; // Don't do anything for Free plan
    }

    setLoading(planName);
    setMessage(null);

    try {
      // For now, using a temporary userId. In production, this would come from authentication
      const userId = "user-123"; // Replace with actual user ID from auth

      const response = await fetch("/api/upgrade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          plan: planName,
          cadence,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: data.message || "Successfully upgraded!" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to upgrade. Please try again." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
      console.error("Upgrade error:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Billing & Pricing</h1>
        <p className="text-sm text-slate-500">Track usage, upgrade plans, and review history.</p>
        {message && (
          <div className={`mt-4 rounded-lg p-3 text-sm ${
            message.type === "success" 
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {message.text}
          </div>
        )}
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Usage</h2>
              <p className="text-sm text-slate-500">Updates every ~15 minutes.</p>
            </div>
            <div className="space-y-3">
              {usageMetrics.map((metric) => (
                <UsageProgress key={metric.label} {...metric} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Plan</h2>
              <div className="rounded-full border border-slate-200 bg-slate-50 p-1 text-xs font-medium text-slate-600">
                <button
                  onClick={() => setCadence("Monthly")}
                  className={`rounded-full px-3 py-1 ${cadence === "Monthly" ? "bg-white shadow" : ""}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setCadence("Yearly")}
                  className={`rounded-full px-3 py-1 ${cadence === "Yearly" ? "bg-white shadow" : ""}`}
                >
                  Yearly
                </button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`border-2 ${plan.highlight ? "border-orange-400 shadow-lg" : "border-slate-100"}`}
                >
                  <CardContent className="space-y-4 pt-6">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">{plan.name} plan</p>
                      <p className="mt-2 text-3xl font-semibold text-slate-900">
                        {plan.price}
                        <span className="text-base font-normal text-slate-500"> / {cadence.toLowerCase()}</span>
                      </p>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-orange-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant={plan.highlight ? "secondary" : "outline"} 
                      className="w-full"
                      onClick={() => handleUpgrade(plan.name)}
                      disabled={loading === plan.name}
                    >
                      {loading === plan.name 
                        ? "Processing..." 
                        : plan.highlight 
                        ? "Upgrade to Pro" 
                        : "Stay on Free"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Billing history</h2>
            <p className="text-sm text-slate-500">Invoices emailed to finance@tubepulse.co</p>
          </div>
          <div className="rounded-2xl border border-slate-100">
            {billingHistory.map((entry, idx) => (
              <div key={entry.type}>
                <div className="grid grid-cols-4 items-center px-6 py-4 text-sm text-slate-600">
                  <span className="font-medium text-slate-900">{entry.type}</span>
                  <span>{entry.date}</span>
                  <span>{entry.amount}</span>
                  <span className="text-emerald-600">{entry.status}</span>
                </div>
                {idx !== billingHistory.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

