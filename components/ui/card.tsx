import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({
  className,
  hoverEffect = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm transition-all duration-300",
        hoverEffect && "hover:shadow-[0px_20px_48px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-primary/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
