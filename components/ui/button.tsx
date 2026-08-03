"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.97] hover:-translate-y-px disabled:opacity-50 disabled:pointer-events-none rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1 tracking-tight";

    const variants = {
      primary:
        "bg-primary text-on-primary hover:opacity-90 shadow-md shadow-primary/15",
      secondary:
        "bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/30",
      outline:
        "bg-transparent border border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-primary hover:border-primary/40",
      ghost:
        "bg-transparent text-on-surface-variant hover:text-primary hover:bg-surface-container-low",
      link:
        "bg-transparent text-primary hover:underline underline-offset-4 p-0 h-auto shadow-none",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs gap-1.5",
      md: "px-5 py-2.5 text-sm gap-2",
      lg: "px-7 py-3.5 text-sm gap-2",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
