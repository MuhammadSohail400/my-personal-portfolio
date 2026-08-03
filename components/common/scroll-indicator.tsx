"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }}>
      <span className="text-[12px] font-semibold text-outline tracking-[0.2em] uppercase">
        SCROLL TO EXPLORE
      </span>
      <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent relative">
        <motion.div
          animate={{ y: [0, 32, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-sm shadow-primary"
        />
      </div>
    </div>
  );
}
