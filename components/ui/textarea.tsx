import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full bg-surface-container-low border border-outline-variant rounded-lg p-4 font-normal text-on-surface text-base placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 resize-y min-h-[140px]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
