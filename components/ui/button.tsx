'use client';

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost" | "secondary";
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-200 hover:scale-[1.01]",
  outline:
    "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 hover:text-slate-900",
  ghost: "text-slate-600 hover:bg-slate-100",
  secondary: "bg-slate-900 text-white hover:bg-slate-800",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 disabled:cursor-not-allowed disabled:opacity-60",
          variantStyles[variant],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };

