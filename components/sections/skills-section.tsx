"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/common/section-header";
import { Card } from "@/components/ui/card";
import type { SkillCategory } from "@/types/portfolio";
import { Terminal, Database, HardDrive, Cloud, Layers, Wrench, Code2 } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  terminal:     <Terminal  className="w-5 h-5" />,
  database:     <Database  className="w-5 h-5" />,
  storage:      <HardDrive className="w-5 h-5" />,
  cloud:        <Cloud     className="w-5 h-5" />,
  layers:       <Layers    className="w-5 h-5" />,
  construction: <Wrench    className="w-5 h-5" />,
};

export function SkillsSection({ skills: SKILL_CATEGORIES }: { skills: SkillCategory[] }) {
  return (
    <section id="skills" className="py-20 bg-background">
      <Container>
        <SectionHeader
          badge="Specialized Toolkit"
          title="Technical Expertise"
          description="A curated toolkit for building scalable backend architectures, high-performance web apps, and resilient cloud infrastructures."
          align="center"
        />

        {/* Skills Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-14">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.38, delay: index * 0.07 }}
            >
              <Card className="h-full bg-surface-container-lowest border border-outline-variant p-5 flex flex-col gap-4 group hover:-translate-y-1.5 hover:shadow-[0px_16px_40px_-8px_rgba(0,0,0,0.07)] hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      category.accentColor === "primary"
                        ? "bg-primary/10 text-primary"
                        : category.accentColor === "secondary"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-tertiary/10 text-tertiary"
                    }`}
                  >
                    {ICON_MAP[category.icon] || <Code2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-hero-lg text-base font-bold text-on-background leading-tight">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="font-body-base text-xs text-on-surface-variant leading-relaxed">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`bg-surface-container-low border font-semibold text-[10px] px-2.5 py-1 rounded-md tracking-wide transition-all duration-200 cursor-default hover:bg-primary hover:text-white hover:border-primary hover:scale-105 text-on-surface-variant ${
                        category.accentColor === "primary"
                          ? "border-primary/20"
                          : category.accentColor === "secondary"
                          ? "border-secondary/20"
                          : "border-tertiary/20"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technical Environment Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-on-background rounded-2xl p-7 sm:p-10 min-h-[280px] flex flex-col justify-end overflow-hidden group border border-outline-variant/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-secondary/8 pointer-events-none" />

          <div className="relative z-10 max-w-sm space-y-3">
            <span className="text-primary-fixed-dim font-bold text-[10px] tracking-[0.2em] uppercase block">
              SYSTEM CORE
            </span>
            <h3 className="font-hero-lg text-2xl font-bold text-surface-bright">
              Precision Engineering
            </h3>
            <p className="text-outline font-body-base text-sm leading-relaxed">
              Every line of code is written with maintenance and performance in mind — rigorous testing, type safety, and modular architecture.
            </p>
          </div>

          {/* Mock Code Block */}
          <div className="absolute top-7 right-7 hidden lg:block w-[380px] font-mono text-xs bg-surface/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-2xl transition-transform duration-700 group-hover:rotate-1">
            <div className="flex gap-1.5 mb-3.5">
              <div className="w-2.5 h-2.5 rounded-full bg-error" />
              <div className="w-2.5 h-2.5 rounded-full bg-tertiary" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            </div>
            <div className="space-y-1 text-surface-bright">
              <div>
                <span className="text-primary-fixed-dim">func </span>
                <span className="text-white font-bold">BuildArchitecture()</span> &#123;
              </div>
              <div className="pl-4 text-outline space-y-1">
                <span className="text-tertiary-fixed-dim block">// Initialize cloud cluster</span>
                <div>infra := aws.NewCluster(<span className="text-primary-fixed-dim">&quot;production&quot;</span>)</div>
                <span className="text-tertiary-fixed-dim block mt-2">// Scale node groups</span>
                <div>infra.ScaleTo(<span className="text-primary-fixed-dim">12</span>)</div>
                <span className="text-tertiary-fixed-dim block mt-2">// Deploy microservices</span>
                <div>k8s.Apply(<span className="text-primary-fixed-dim">&quot;./manifests&quot;</span>)</div>
              </div>
              <div>&#125;</div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
