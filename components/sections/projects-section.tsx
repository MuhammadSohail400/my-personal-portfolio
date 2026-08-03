"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/common/section-header";
import { FEATURED_PROJECTS } from "@/lib/data/portfolio-data";
import { Code2, Rocket, FileText } from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-surface">
      <Container>
        <SectionHeader
          badge="Portfolio Highlights"
          title="Featured Engineering Work"
          description="High-performance backend systems and distributed architectures engineered for scalability and reliability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {FEATURED_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="group bg-surface-container-lowest border border-outline-variant/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0px_16px_40px_-8px_rgba(0,80,203,0.1)] hover:-translate-y-1.5 hover:border-primary/20 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden bg-surface-container-low shrink-0">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/15 to-transparent" />
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container-low text-primary border border-primary/20 px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-hero-lg text-lg font-bold text-on-background mb-2 group-hover:text-primary transition-colors leading-tight">
                  {project.title}
                </h3>

                <p className="text-on-surface-variant font-body-base text-xs leading-relaxed mb-4 line-clamp-3 flex-grow">
                  {project.shortDescription}
                </p>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-outline-variant/20">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary transition-all duration-200 text-on-surface-variant text-center group/btn"
                    title="View GitHub Repository"
                  >
                    <Code2 className="w-3.5 h-3.5 mb-0.5" />
                    <span className="text-[9px] font-bold tracking-wider uppercase">GitHub</span>
                  </a>

                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary transition-all duration-200 text-on-surface-variant text-center group/btn"
                    title="View Live Demo"
                  >
                    <Rocket className="w-3.5 h-3.5 mb-0.5" />
                    <span className="text-[9px] font-bold tracking-wider uppercase">Demo</span>
                  </a>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary transition-all duration-200 text-on-surface-variant text-center group/btn"
                    title="Read Case Study"
                  >
                    <FileText className="w-3.5 h-3.5 mb-0.5" />
                    <span className="text-[9px] font-bold tracking-wider uppercase">Study</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
