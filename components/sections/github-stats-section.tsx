"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/common/section-header";
import { Card } from "@/components/ui/card";
import { GITHUB_STATS, TOP_REPOSITORIES } from "@/lib/data/portfolio-data";
import { GitCommit, Star, FolderGit2, ExternalLink, GitFork } from "lucide-react";

export function GitHubStatsSection() {
  const activitySquares = useMemo(() => {
    return Array.from({ length: 364 }, (_, i) => {
      // Deterministic hash based on index to prevent SSR/Client hydration mismatch
      const pseudoRand = ((i * 37 + 13) % 100) / 100;
      let level = 0;
      if (pseudoRand > 0.45) level = 1;
      if (pseudoRand > 0.7)  level = 2;
      if (pseudoRand > 0.88) level = 3;
      if (pseudoRand > 0.96) level = 4;
      return { id: i, level };
    });
  }, []);

  const getSquareColor = (level: number) => {
    switch (level) {
      case 1: return "bg-primary-fixed-dim";
      case 2: return "bg-primary/50";
      case 3: return "bg-primary";
      case 4: return "bg-on-primary-fixed-variant";
      default: return "bg-surface-container-low";
    }
  };

  return (
    <section className="py-20 bg-background">
      <Container>
        <SectionHeader
          badge="Open Source & Stats"
          title="Code & Contributions"
          description="A quantitative deep-dive into my engineering journey — tracking repositories, commit frequencies, and community impact."
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-10">
          {[
            {
              icon: <GitCommit className="w-4 h-4" />,
              label: "Global Activity",
              value: GITHUB_STATS.totalCommits.toLocaleString(),
              sub: "Total Commits",
              color: "primary" as const,
              delay: 0,
            },
            {
              icon: <Star className="w-4 h-4" />,
              label: "Community Impact",
              value: GITHUB_STATS.starsEarned,
              sub: "Stars Earned",
              color: "secondary" as const,
              delay: 0.08,
            },
            {
              icon: <FolderGit2 className="w-4 h-4" />,
              label: "Architecture",
              value: GITHUB_STATS.repositoriesBuilt,
              sub: "Repositories Built",
              color: "tertiary" as const,
              delay: 0.16,
            },
          ].map((item) => (
            <motion.div
              key={item.sub}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: item.delay }}
            >
              <Card className={`p-6 bg-surface border border-outline-variant hover:shadow-[0px_8px_24px_-4px_rgba(0,0,0,0.05)] transition-shadow`}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`p-1.5 rounded-lg bg-${item.color}/10 text-${item.color}`}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-outline uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
                <div className={`font-hero-lg text-3xl sm:text-4xl font-bold text-${item.color} mb-1`}>
                  {item.value}
                </div>
                <div className="font-body-base text-sm text-on-surface-variant font-medium">
                  {item.sub}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contribution Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="p-6 border border-outline-variant bg-surface rounded-2xl mb-10 overflow-x-auto"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5">
            <h3 className="font-hero-lg text-lg font-bold text-on-background">
              365-Day Activity Heatmap
            </h3>
            <div className="flex items-center gap-2 text-xs text-outline font-medium">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-surface-container-low rounded-sm" />
                <div className="w-3 h-3 bg-primary-fixed-dim rounded-sm" />
                <div className="w-3 h-3 bg-primary/50 rounded-sm" />
                <div className="w-3 h-3 bg-primary rounded-sm" />
                <div className="w-3 h-3 bg-on-primary-fixed-variant rounded-sm" />
              </div>
              <span>More</span>
            </div>
          </div>

          <div className="contribution-grid min-w-[680px]">
            {activitySquares.map((sq) => (
              <div
                key={sq.id}
                className={`contribution-square ${getSquareColor(sq.level)} transition-colors hover:ring-1 hover:ring-primary/60`}
                title={`Day ${sq.id + 1}: ${sq.level * 3} commits`}
              />
            ))}
          </div>
        </motion.div>

        {/* Top Repos */}
        <div>
          <h3 className="font-hero-lg text-xl font-bold text-on-background mb-5">
            Top Public Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {TOP_REPOSITORIES.map((repo) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="h-full p-5 bg-surface-container-lowest border border-outline-variant hover:border-primary/35 hover:-translate-y-1 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-hero-lg text-base font-bold text-on-background group-hover:text-primary transition-colors flex items-center gap-1.5">
                        <span>{repo.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <span className="bg-surface-container-high text-primary text-[10px] font-bold px-2 py-0.5 rounded shrink-0">
                        {repo.language}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-xs line-clamp-2 leading-relaxed mb-4">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-5 text-xs text-outline font-medium pt-3 border-t border-outline-variant/10">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks}
                    </span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
