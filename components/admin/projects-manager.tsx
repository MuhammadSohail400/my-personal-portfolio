"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getProjects, createProject, updateProject, deleteProject } from "@/lib/admin-api";
import { Loader2, Plus, Trash2, Save, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

interface CaseStudy {
  title?: string;
  subtitle?: string;
  categoryTag?: string;
  tags?: string[];
  problem?: { description?: string; quote?: string };
  solution?: { description?: string; highlights?: string[] };
  architectureDiagramAlt?: string;
  architectureDiagramUrl?: string;
  keyFeatures?: { icon: string; title: string; description: string }[];
  liveMetrics?: { label: string; value: string; color: string }[];
  codeSnippet?: { filename?: string; code?: string };
  lessonsLearned?: string[];
  githubUrl?: string;
  fullDocUrl?: string;
}

interface ProjectItem {
  _id?: string;
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  tags: string[];
  githubUrl: string;
  liveDemoUrl: string;
  category: string;
  featured: boolean;
  order: number;
  caseStudy?: CaseStudy;
}

const BLANK: ProjectItem = {
  slug: "",
  title: "",
  shortDescription: "",
  image: "",
  imageAlt: "",
  tags: [],
  githubUrl: "",
  liveDemoUrl: "",
  category: "fullstack",
  featured: true,
  order: 0,
};

const CATEGORIES = ["backend", "fullstack", "distributed", "fintech", "analytics", "microservices"];

// --- small helpers to keep the case-study form simple (no nested array UI) ---
const linesToList = (text: string) => text.split("\n").map((l) => l.trim()).filter(Boolean);
const listToLines = (list?: string[]) => (list || []).join("\n");

// "icon|title|description" per line
const parseFeatureLines = (text: string) =>
  linesToList(text).map((line) => {
    const [icon, title, description] = line.split("|").map((s) => s.trim());
    return { icon: icon || "", title: title || "", description: description || "" };
  });
const featuresToLines = (features?: { icon: string; title: string; description: string }[]) =>
  (features || []).map((f) => `${f.icon}|${f.title}|${f.description}`).join("\n");

// "label|value|color" per line
const parseMetricLines = (text: string) =>
  linesToList(text).map((line) => {
    const [label, value, color] = line.split("|").map((s) => s.trim());
    return { label: label || "", value: value || "", color: color || "" };
  });
const metricsToLines = (metrics?: { label: string; value: string; color: string }[]) =>
  (metrics || []).map((m) => `${m.label}|${m.value}|${m.color}`).join("\n");

function ProjectCard({
  project,
  onSave,
  onDelete,
}: {
  project: ProjectItem;
  onSave: (id: string, data: Partial<ProjectItem>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [form, setForm] = useState(project);
  const [tagsText, setTagsText] = useState(project.tags.join(", "));
  const [busy, setBusy] = useState(false);
  const [showCaseStudy, setShowCaseStudy] = useState(!!project.caseStudy);
  const [cs, setCs] = useState<CaseStudy>(project.caseStudy || {});
  const [csTagsText, setCsTagsText] = useState((project.caseStudy?.tags || []).join(", "));
  const [highlightsText, setHighlightsText] = useState(listToLines(project.caseStudy?.solution?.highlights));
  const [lessonsText, setLessonsText] = useState(listToLines(project.caseStudy?.lessonsLearned));
  const [featuresText, setFeaturesText] = useState(featuresToLines(project.caseStudy?.keyFeatures));
  const [metricsText, setMetricsText] = useState(metricsToLines(project.caseStudy?.liveMetrics));

  const handleSave = async () => {
    setBusy(true);
    try {
      const payload: Partial<ProjectItem> = {
        ...form,
        tags: tagsText.split(",").map((s) => s.trim()).filter(Boolean),
      };

      if (showCaseStudy) {
        payload.caseStudy = {
          ...cs,
          tags: csTagsText.split(",").map((s) => s.trim()).filter(Boolean),
          solution: { ...cs.solution, highlights: linesToList(highlightsText) },
          lessonsLearned: linesToList(lessonsText),
          keyFeatures: parseFeatureLines(featuresText),
          liveMetrics: parseMetricLines(metricsText),
        };
      } else {
        payload.caseStudy = undefined;
      }

      await onSave(project._id!, payload);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="glass-card p-5 rounded-2xl border border-outline-variant bg-surface-container-lowest space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input placeholder="Slug (url-safe, unique)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <Input placeholder="Image URL or /public path" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <Input placeholder="Image Alt Text" value={form.imageAlt} onChange={(e) => setForm({ ...form, imageAlt: e.target.value })} />
        <Input placeholder="GitHub URL" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
        <Input placeholder="Live Demo URL" value={form.liveDemoUrl} onChange={(e) => setForm({ ...form, liveDemoUrl: e.target.value })} />
        <select
          className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-4 text-sm"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <Input type="number" placeholder="Order (lower shows first)" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
      </div>
      <Textarea rows={2} placeholder="Short description" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
      <Input placeholder="Tags (comma separated)" value={tagsText} onChange={(e) => setTagsText(e.target.value)} />

      <button
        type="button"
        onClick={() => setShowCaseStudy((v) => !v)}
        className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wide"
      >
        {showCaseStudy ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        {showCaseStudy ? "Hide case study" : "This project has a case-study page"}
      </button>

      {showCaseStudy && (
        <div className="space-y-3 border-t border-outline-variant/40 pt-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input placeholder="Case study title" value={cs.title || ""} onChange={(e) => setCs({ ...cs, title: e.target.value })} />
            <Input placeholder="Category tag" value={cs.categoryTag || ""} onChange={(e) => setCs({ ...cs, categoryTag: e.target.value })} />
          </div>
          <Textarea rows={2} placeholder="Subtitle" value={cs.subtitle || ""} onChange={(e) => setCs({ ...cs, subtitle: e.target.value })} />
          <Input placeholder="Case study tags (comma separated)" value={csTagsText} onChange={(e) => setCsTagsText(e.target.value)} />

          <Textarea rows={3} placeholder="Problem description" value={cs.problem?.description || ""} onChange={(e) => setCs({ ...cs, problem: { ...cs.problem, description: e.target.value } })} />
          <Input placeholder="Problem quote" value={cs.problem?.quote || ""} onChange={(e) => setCs({ ...cs, problem: { ...cs.problem, quote: e.target.value } })} />

          <Textarea rows={3} placeholder="Solution description" value={cs.solution?.description || ""} onChange={(e) => setCs({ ...cs, solution: { ...cs.solution, description: e.target.value } })} />
          <Textarea rows={3} placeholder="Solution highlights (one per line)" value={highlightsText} onChange={(e) => setHighlightsText(e.target.value)} />

          <Input placeholder="Architecture diagram alt text" value={cs.architectureDiagramAlt || ""} onChange={(e) => setCs({ ...cs, architectureDiagramAlt: e.target.value })} />
          <Input placeholder="Architecture diagram image URL" value={cs.architectureDiagramUrl || ""} onChange={(e) => setCs({ ...cs, architectureDiagramUrl: e.target.value })} />

          <Textarea
            rows={3}
            placeholder={"Key features — one per line as: icon|title|description"}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
          />
          <Textarea
            rows={3}
            placeholder={"Live metrics — one per line as: label|value|color-class"}
            value={metricsText}
            onChange={(e) => setMetricsText(e.target.value)}
          />

          <Input placeholder="Code snippet filename" value={cs.codeSnippet?.filename || ""} onChange={(e) => setCs({ ...cs, codeSnippet: { ...cs.codeSnippet, filename: e.target.value } })} />
          <Textarea rows={4} placeholder="Code snippet content" value={cs.codeSnippet?.code || ""} onChange={(e) => setCs({ ...cs, codeSnippet: { ...cs.codeSnippet, code: e.target.value } })} />

          <Textarea rows={3} placeholder="Lessons learned (one per line)" value={lessonsText} onChange={(e) => setLessonsText(e.target.value)} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input placeholder="Case study GitHub URL" value={cs.githubUrl || ""} onChange={(e) => setCs({ ...cs, githubUrl: e.target.value })} />
            <Input placeholder="Full doc URL" value={cs.fullDocUrl || ""} onChange={(e) => setCs({ ...cs, fullDocUrl: e.target.value })} />
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <Button size="sm" onClick={handleSave} disabled={busy} className="flex items-center gap-1.5">
          <Save className="w-3.5 h-3.5" /> Save
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onDelete(project._id!)}
          disabled={busy}
          className="flex items-center gap-1.5 text-error border-error/30 hover:bg-error-container/20"
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </Button>
      </div>
    </div>
  );
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [adding, setAdding] = useState(false);

  const refresh = () => getProjects().then(setProjects).catch((e) => setErrorMsg(e.message));

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    setAdding(true);
    try {
      await createProject({ ...BLANK, slug: `new-project-${Date.now()}`, title: "New Project" });
      await refresh();
    } catch (e: any) {
      setErrorMsg(e.message);
    } finally {
      setAdding(false);
    }
  };

  const handleSave = async (id: string, data: Partial<ProjectItem>) => {
    try {
      await updateProject(id, data);
      await refresh();
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      await refresh();
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-on-surface-variant text-sm py-10">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading projects...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {errorMsg && (
        <div className="p-3 bg-error-container/25 border border-error/25 rounded-xl text-on-error-container text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
        </div>
      )}
      {projects.map((p) => (
        <ProjectCard key={p._id} project={p} onSave={handleSave} onDelete={handleDelete} />
      ))}
      <Button onClick={handleAdd} disabled={adding} variant="outline" className="flex items-center gap-1.5">
        <Plus className="w-4 h-4" /> Add Project
      </Button>
    </div>
  );
}
