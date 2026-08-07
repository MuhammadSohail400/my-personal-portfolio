"use client";

import * as React from "react";
import { useState } from "react";
import { Container } from "@/components/layout/container";
import { ContentEditor } from "@/components/admin/content-editor";
import { SkillsManager } from "@/components/admin/skills-manager";
import { ProjectsManager } from "@/components/admin/projects-manager";
import { LayoutDashboard, Sparkles, FolderKanban, ShieldAlert } from "lucide-react";

type Tab = "content" | "skills" | "projects";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "content", label: "Content", icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: "skills", label: "Skills", icon: <Sparkles className="w-4 h-4" /> },
  { id: "projects", label: "Projects", icon: <FolderKanban className="w-4 h-4" /> },
];

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("content");

  return (
    <section className="py-16 min-h-screen bg-surface">
      <Container>
        <div className="mb-8">
          <h1 className="font-hero-lg text-2xl sm:text-3xl font-bold text-on-surface">
            Admin Panel
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Edit your portfolio content — changes save straight to the database.
          </p>

          <div className="mt-4 p-3.5 bg-error-container/20 border border-error/25 rounded-xl text-on-error-container text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              This page has no login yet — anyone with the URL can edit your data. Don&apos;t link to
              it publicly, and add authentication before relying on it long-term.
            </span>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b border-outline-variant">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {tab === "content" && <ContentEditor />}
        {tab === "skills" && <SkillsManager />}
        {tab === "projects" && <ProjectsManager />}
      </Container>
    </section>
  );
}
