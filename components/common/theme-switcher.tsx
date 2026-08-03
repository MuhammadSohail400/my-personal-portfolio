"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, Theme } from "@/components/common/theme-provider";
import { Check, Palette } from "lucide-react";

interface ThemeOption {
  id: Theme;
  label: string;
  color: string;
}

const THEMES: ThemeOption[] = [
  { id: "blue",   label: "Ocean Blue",  color: "#0050cb" },
  { id: "purple", label: "Violet",      color: "#7c3aed" },
  { id: "orange", label: "Ember",       color: "#c2410c" },
  { id: "green",  label: "Forest",      color: "#15803d" },
  { id: "red",    label: "Crimson",     color: "#b91c1c" },
  { id: "teal",   label: "Teal",        color: "#0f766e" },
  { id: "indigo", label: "Indigo",      color: "#4338ca" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const activeTheme = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div ref={ref} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-outline-variant/50 bg-surface-container-lowest hover:border-primary/40 hover:bg-surface-container-low transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 group"
        aria-label="Switch accent theme"
        aria-expanded={open}
        title="Customize accent theme"
      >
        <div
          className="w-3.5 h-3.5 rounded-full ring-[1.5px] ring-white shadow transition-transform duration-200 group-hover:scale-110"
          style={{ backgroundColor: activeTheme.color }}
        />
        <Palette className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-primary transition-colors" />
      </button>

      {/* Popover Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-48 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-xl shadow-black/8 p-2 z-50"
          >
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-2.5 py-1.5 mb-0.5">
              Accent Color
            </p>

            <div className="flex flex-col">
              {THEMES.map((t, i) => (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl transition-colors duration-150 text-left group/item ${
                    theme === t.id
                      ? "bg-surface-container-low"
                      : "hover:bg-surface-container-low"
                  }`}
                >
                  {/* Color swatch */}
                  <div
                    className="w-4 h-4 rounded-full ring-2 ring-white shadow-sm shrink-0 transition-transform duration-150 group-hover/item:scale-110"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="text-sm font-medium text-on-surface flex-grow leading-none">
                    {t.label}
                  </span>
                  {theme === t.id && (
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: t.color }} />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
