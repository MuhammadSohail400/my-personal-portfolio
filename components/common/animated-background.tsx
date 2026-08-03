import * as React from "react";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Geometric grid pattern */}
      <div className="absolute inset-0 geometric-grid opacity-60" />

      {/* Primary Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      {/* Secondary Ambient Glow */}
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
    </div>
  );
}
