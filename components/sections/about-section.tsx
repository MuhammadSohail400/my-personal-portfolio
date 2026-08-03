"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/common/section-header";
import { Card } from "@/components/ui/card";
import { PERSONAL_INFO, EXPERIENCE_LIST } from "@/lib/data/portfolio-data";
import { Target, GraduationCap } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-surface">
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="text-primary font-bold text-[11px] tracking-[0.16em] uppercase">
            Identity &amp; Journey
          </span>
          <h2 className="font-hero-lg text-3xl sm:text-4xl font-bold text-on-background tracking-tight">
            Architecting the <span className="text-primary">Core</span>.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch mb-14">
          {/* Profile Card */}
          <Card className="lg:col-span-8 p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start border border-outline-variant bg-surface-container-lowest">
            <div className="w-full md:w-48 md:shrink-0 aspect-square rounded-2xl overflow-hidden relative shadow-lg ring-1 ring-outline/10">
              <Image
                src={PERSONAL_INFO.avatarUrl}
                alt={PERSONAL_INFO.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-hero-lg text-xl font-bold text-on-background mb-2">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-on-surface-variant font-body-base text-sm leading-relaxed mb-4">
                {PERSONAL_INFO.fullBio}
              </p>
              <div className="flex flex-wrap gap-2">
                {["Distributed Systems", "Architecture", "Databases"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surface-container-high text-primary font-semibold text-[11px] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Side Cards */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            {/* Career Goals */}
            <div className="bg-primary text-on-primary p-6 rounded-2xl flex-1 shadow-md relative overflow-hidden flex flex-col justify-between">
              <div className="relative z-10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-hero-lg text-base font-bold">Career Goals</h4>
                <p className="text-on-primary/85 font-body-base text-xs leading-relaxed">
                  {PERSONAL_INFO.careerGoal}
                </p>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            </div>

            {/* Education */}
            <div className="bg-surface-container-highest border border-outline-variant p-6 rounded-2xl flex-1 shadow-sm flex flex-col justify-center space-y-1.5">
              <div className="flex items-center gap-2.5 text-primary mb-1">
                <GraduationCap className="w-5 h-5" />
                <h4 className="font-hero-lg text-base font-bold text-on-background">Education</h4>
              </div>
              <p className="text-on-surface font-semibold text-sm">
                {PERSONAL_INFO.education.degree}
              </p>
              <p className="text-on-surface-variant text-xs">
                {PERSONAL_INFO.education.focus}
              </p>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="flex flex-col lg:flex-row gap-12 pt-4">
          <div className="lg:w-1/3 lg:sticky lg:top-28 h-fit">
            <SectionHeader
              badge="Work History"
              title="Professional Experience"
              description="A track record of delivering high-performance backend solutions. Each role has been a step towards mastering complex distributed ecosystems."
            />
          </div>

          <div className="lg:w-2/3 relative flex flex-col gap-7">
            {/* Connecting line */}
            <div className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-outline-variant/40" />

            {EXPERIENCE_LIST.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative pl-12 group"
              >
                {/* Timeline node */}
                <div className="absolute left-0 top-1.5 w-10 h-10 flex items-center justify-center">
                  <div
                    className={`w-3 h-3 rounded-full ring-4 ring-white shadow-sm z-10 transition-transform duration-300 group-hover:scale-125 ${
                      exp.isCurrent
                        ? "bg-primary"
                        : "bg-outline-variant group-hover:bg-primary"
                    }`}
                  />
                </div>

                <Card className="p-5 bg-surface-container-lowest border border-outline-variant rounded-2xl group-hover:border-primary/25 group-hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-hero-lg text-base font-bold text-on-background leading-tight">
                        {exp.role}
                      </h4>
                      <p className="text-primary font-semibold text-sm">{exp.company}</p>
                    </div>
                    <span className="bg-surface-container-high px-2.5 py-1 rounded text-[11px] font-bold text-primary w-fit shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-on-surface-variant font-body-base text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-container border border-outline-variant/20 px-2.5 py-0.5 rounded-full text-[11px] text-on-surface-variant font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
