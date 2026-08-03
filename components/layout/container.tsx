import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
