"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSkills, createSkill, updateSkill, deleteSkill } from "@/lib/admin-api";
import { Loader2, Plus, Trash2, Save, X, AlertCircle } from "lucide-react";

interface SkillCategory {
  _id?: string;
  categoryId: string;
  title: string;
  description: string;
  icon: string;
  accentColor: "primary" | "secondary" | "tertiary";
  skills: string[];
  order: number;
}

const BLANK: SkillCategory = {
  categoryId: "",
  title: "",
  description: "",
  icon: "",
  accentColor: "primary",
  skills: [],
  order: 0,
};

function SkillCard({
  skill,
  onSave,
  onDelete,
}: {
  skill: SkillCategory;
  onSave: (id: string, data: Partial<SkillCategory>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [form, setForm] = useState(skill);
  const [skillsText, setSkillsText] = useState(skill.skills.join(", "));
  const [busy, setBusy] = useState(false);

  const handleSave = async () => {
    setBusy(true);
    try {
      await onSave(skill._id!, {
        ...form,
        skills: skillsText.split(",").map((s) => s.trim()).filter(Boolean),
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="glass-card p-5 rounded-2xl border border-outline-variant bg-surface-container-lowest space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input placeholder="Category ID (e.g. backend)" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} />
        <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <Input placeholder="Icon name (lucide/material)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
        <select
          className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-4 text-sm"
          value={form.accentColor}
          onChange={(e) => setForm({ ...form, accentColor: e.target.value as SkillCategory["accentColor"] })}
        >
          <option value="primary">primary</option>
          <option value="secondary">secondary</option>
          <option value="tertiary">tertiary</option>
        </select>
      </div>
      <Textarea rows={2} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <Input placeholder="Skills (comma separated)" value={skillsText} onChange={(e) => setSkillsText(e.target.value)} />
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave} disabled={busy} className="flex items-center gap-1.5">
          <Save className="w-3.5 h-3.5" /> Save
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onDelete(skill._id!)}
          disabled={busy}
          className="flex items-center gap-1.5 text-error border-error/30 hover:bg-error-container/20"
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </Button>
      </div>
    </div>
  );
}

export function SkillsManager() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [adding, setAdding] = useState(false);

  const refresh = () => getSkills().then(setSkills).catch((e) => setErrorMsg(e.message));

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    setAdding(true);
    try {
      await createSkill({ ...BLANK, categoryId: `new-category-${Date.now()}`, title: "New Category" });
      await refresh();
    } catch (e: any) {
      setErrorMsg(e.message);
    } finally {
      setAdding(false);
    }
  };

  const handleSave = async (id: string, data: Partial<SkillCategory>) => {
    try {
      await updateSkill(id, data);
      await refresh();
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill category?")) return;
    try {
      await deleteSkill(id);
      await refresh();
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-on-surface-variant text-sm py-10">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading skills...
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
      {skills.map((s) => (
        <SkillCard key={s._id} skill={s} onSave={handleSave} onDelete={handleDelete} />
      ))}
      <Button onClick={handleAdd} disabled={adding} variant="outline" className="flex items-center gap-1.5">
        <Plus className="w-4 h-4" /> Add Skill Category
      </Button>
    </div>
  );
}
