"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ScrollIndicator } from "@/components/common/scroll-indicator";
import type { PersonalInfo } from "@/lib/data/fetch-portfolio";
import { ArrowRight, Terminal, Code, Database, Gauge, Network } from "lucide-react";

export function HeroSection({ personalInfo: PERSONAL_INFO }: { personalInfo: PersonalInfo }) {
  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-center pt-20 pb-12 overflow-hidden geometric-grid">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center my-auto">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6 z-10"
        >
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-[11px] rounded-md tracking-[0.15em] uppercase">
              {PERSONAL_INFO.badge}
            </span>
            <h1 className="font-hero-lg text-4xl sm:text-5xl font-bold text-on-background tracking-tight leading-[1.1]">
              {PERSONAL_INFO.name}
            </h1>
            <p className="font-hero-lg text-lg sm:text-xl text-primary/90 font-medium max-w-md">
              {PERSONAL_INFO.title}
            </p>
            <p className="font-body-base text-sm text-on-surface-variant max-w-md leading-relaxed">
              {PERSONAL_INFO.shortBio}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              variant="primary"
              size="md"
              className="flex items-center shadow-lg shadow-primary/15"
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Me
            </Button>
          </div>

          {/* Trust Strip */}
          <div className="pt-4 flex items-center gap-5 border-t border-outline-variant/20">
            <div className="flex items-center gap-3 text-outline">
              <Terminal className="w-5 h-5" />
              <Code className="w-5 h-5" />
              <Database className="w-5 h-5" />
            </div>
            <div className="h-5 w-px bg-outline-variant/40" />
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
              Passionate about DX
            </span>
          </div>
        </motion.div>

        {/* Right Column: Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative flex justify-center items-center mt-10 lg:mt-0"
        >
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-8 bg-primary/8 blur-3xl rounded-full" />

            <div className="relative bg-white/70 backdrop-blur-md p-3 rounded-3xl border border-white/80 shadow-2xl">
              <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/20">
                <Image
                  src={PERSONAL_INFO.heroDiagramUrl}
                  alt="System Architecture Diagram"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>

            {/* Floating Chip: Uptime */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-3 sm:-left-5 bg-white border border-outline-variant/40 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-3 z-20"
            >
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Gauge className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-outline uppercase tracking-wider">UPTIME</div>
                <div className="font-mono text-sm font-bold text-green-600 leading-none">99.99%</div>
              </div>
            </motion.div>

            {/* Floating Chip: Nodes */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -right-3 sm:-right-5 bg-white border border-outline-variant/40 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-3 z-20"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-outline uppercase tracking-wider">NODES</div>
                <div className="font-mono text-sm font-bold text-primary leading-none">SCALABLE</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      <div className="mt-10">
        <ScrollIndicator />
      </div>
    </section>
  );
}
