"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CodeBlock } from "@/components/common/code-block";
import { Button } from "@/components/ui/button";
import { CaseStudy } from "@/types/portfolio";
import {
  Terminal,
  CheckCircle,
  Network,
  Zap,
  RotateCcw,
  ShieldCheck,
  Star,
  BookOpen,
  ArrowLeft,
} from "lucide-react";

export interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

export function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
  return (
    <article className="pt-28 pb-32">
      {/* Hero Header */}
      <header className="relative py-16 sm:py-24 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto text-center overflow-hidden">
        <div className="mb-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary/20 text-primary mb-6">
          <Terminal className="w-4 h-4" />
          <span className="font-semibold text-xs uppercase tracking-wider">
            {caseStudy.categoryTag}
          </span>
        </div>

        <h1 className="font-hero-lg text-4xl sm:text-5xl lg:text-6xl font-bold text-on-background mb-6 max-w-4xl mx-auto leading-tight">
          {caseStudy.title}
        </h1>

        <p className="font-body-base text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
          {caseStudy.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {caseStudy.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-surface-container rounded-lg border border-outline-variant/40 font-semibold text-xs text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Main Case Study Body */}
      <Container className="max-w-4xl space-y-24">
        {/* Problem & Solution */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="font-hero-lg text-3xl font-bold text-on-background">
              The Problem
            </h2>
            <p className="text-on-surface-variant text-base leading-relaxed">
              {caseStudy.problem.description}
            </p>
            <div className="p-6 bg-error-container/30 border-l-4 border-error rounded-r-2xl">
              <p className="text-on-error-container font-medium italic text-sm sm:text-base">
                {caseStudy.problem.quote}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-hero-lg text-3xl font-bold text-on-background">
              The Solution
            </h2>
            <p className="text-on-surface-variant text-base leading-relaxed">
              {caseStudy.solution.description}
            </p>
            <ul className="space-y-3 pt-2">
              {caseStudy.solution.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-on-surface text-sm sm:text-base font-medium">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Architecture Deep Dive Diagram */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-hero-lg text-3xl font-bold text-on-background">
              Architecture Deep Dive
            </h2>
            <p className="text-on-surface-variant text-base">
              The interaction between the Load Balancer, Hash Ring, and Distributed Storage Nodes.
            </p>
          </div>

          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-outline-variant shadow-lg bg-surface-container-low group">
            <Image
              src={caseStudy.architectureDiagramUrl}
              alt={caseStudy.architectureDiagramAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>
        </section>

        {/* Features & Metrics Bento */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Key Engineering Features Card (2 Cols) */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant shadow-sm">
            <h3 className="font-hero-lg text-2xl font-bold text-on-background mb-8">
              Key Engineering Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {caseStudy.keyFeatures.map((feat, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary">
                    {idx === 0 && <Network className="w-6 h-6" />}
                    {idx === 1 && <Zap className="w-6 h-6" />}
                    {idx === 2 && <RotateCcw className="w-6 h-6" />}
                    {idx === 3 && <ShieldCheck className="w-6 h-6" />}
                  </div>
                  <h4 className="font-bold text-on-surface text-base">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Card (1 Col) */}
          <div className="p-8 rounded-3xl bg-on-background text-on-primary flex flex-col justify-between border border-outline-variant/30">
            <div>
              <h3 className="font-hero-lg text-2xl font-bold mb-8">Live Metrics</h3>
              <div className="space-y-8">
                {caseStudy.liveMetrics.map((metric, idx) => (
                  <div key={idx}>
                    <span className="block text-outline text-xs uppercase tracking-widest mb-1 font-bold">
                      {metric.label}
                    </span>
                    <span className={`text-4xl font-bold ${metric.color}`}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-outline/20">
              <p className="text-xs text-outline">
                Calculated across 4 geographic regions.
              </p>
            </div>
          </div>
        </section>

        {/* Code Snippet */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="font-hero-lg text-3xl font-bold text-on-background">
              Implementation
            </h2>
            <span className="text-sm font-mono text-on-surface-variant font-semibold">
              {caseStudy.codeSnippet.filename}
            </span>
          </div>

          <CodeBlock
            filename={caseStudy.codeSnippet.filename}
            code={caseStudy.codeSnippet.code}
          />
        </section>

        {/* Lessons Learned */}
        <section className="p-8 sm:p-14 rounded-3xl bg-surface-container-low border border-primary/10 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 blur-3xl rounded-full" />
          <div className="max-w-2xl relative z-10 space-y-6">
            <h2 className="font-hero-lg text-3xl font-bold text-on-background">
              Lessons Learned
            </h2>

            <div className="space-y-4 text-on-surface-variant text-base leading-relaxed">
              {caseStudy.lessonsLearned.map((lesson, idx) => (
                <p key={idx}>{lesson}</p>
              ))}
            </div>

            <div className="pt-6 flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                className="flex items-center gap-2"
                onClick={() => window.open(caseStudy.githubUrl, "_blank")}
              >
                <Star className="w-5 h-5 fill-current" />
                <span>View GitHub Repo</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 bg-white"
                onClick={() => window.open(caseStudy.fullDocUrl, "_blank")}
              >
                <BookOpen className="w-5 h-5" />
                <span>Read Full Doc</span>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </article>
  );
}
