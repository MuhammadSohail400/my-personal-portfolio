import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "tertiary" | "outline";
}

export function Badge({
  className,
  variant = "primary",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    primary: "bg-surface-container-low text-primary border border-primary/20",
    secondary: "bg-surface-container-low text-secondary border border-secondary/20",
    tertiary: "bg-surface-container-low text-tertiary border border-tertiary/20",
    outline: "bg-transparent text-on-surface-variant border border-outline-variant",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
