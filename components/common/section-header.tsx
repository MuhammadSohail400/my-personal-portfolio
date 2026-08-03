import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-16",
        align === "center" ? "text-center items-center max-w-2xl mx-auto" : "text-left",
        className
      )}
    >
      {badge && (
        <span className="text-primary font-semibold text-xs tracking-widest uppercase">
          {badge}
        </span>
      )}
      <h2 className="font-hero-lg text-3xl md:text-4xl font-bold text-on-background tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="font-body-base text-base text-on-surface-variant leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
