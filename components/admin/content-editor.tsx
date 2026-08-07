"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getContent, updateContent } from "@/lib/admin-api";
import { Loader2, Save, CheckCircle, AlertCircle } from "lucide-react";

const EMPTY_CONTENT = {
  name: "",
  title: "",
  badge: "",
  shortBio: "",
  fullBio: "",
  careerGoal: "",
  education: { degree: "", focus: "" },
  location: "",
  status: "",
  githubUrl: "",
  linkedinUrl: "",
  twitterUrl: "",
  email: "",
  avatarUrl: "",
  heroDiagramUrl: "",
};

type ContentState = typeof EMPTY_CONTENT;

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="font-semibold text-[10px] text-on-surface-variant uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}

export function ContentEditor() {
  const [data, setData] = useState<ContentState>(EMPTY_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getContent()
      .then((c) => setData({ ...EMPTY_CONTENT, ...c, education: { ...EMPTY_CONTENT.education, ...c.education } }))
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setLoading(false));
  }, []);

  const set = (key: keyof ContentState, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const setEducation = (key: "degree" | "focus", value: string) =>
    setData((prev) => ({ ...prev, education: { ...prev.education, [key]: value } }));

  const handleSave = async () => {
    setSaveState("saving");
    try {
      await updateContent(data);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch (err: any) {
      setSaveState("error");
      setErrorMsg(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-on-surface-variant text-sm py-10">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading content...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name">
          <Input value={data.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Title / Headline">
          <Input value={data.title} onChange={(e) => set("title", e.target.value)} />
        </Field>
        <Field label="Hero Badge">
          <Input value={data.badge} onChange={(e) => set("badge", e.target.value)} />
        </Field>
        <Field label="Location">
          <Input value={data.location} onChange={(e) => set("location", e.target.value)} />
        </Field>
        <Field label="Availability Status">
          <Input value={data.status} onChange={(e) => set("status", e.target.value)} />
        </Field>
        <Field label="Email">
          <Input value={data.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label="GitHub URL">
          <Input value={data.githubUrl} onChange={(e) => set("githubUrl", e.target.value)} />
        </Field>
        <Field label="LinkedIn URL">
          <Input value={data.linkedinUrl} onChange={(e) => set("linkedinUrl", e.target.value)} />
        </Field>
        <Field label="Twitter URL">
          <Input value={data.twitterUrl} onChange={(e) => set("twitterUrl", e.target.value)} />
        </Field>
        <Field label="Avatar Image Path">
          <Input value={data.avatarUrl} onChange={(e) => set("avatarUrl", e.target.value)} />
        </Field>
        <Field label="Hero Diagram Image Path">
          <Input value={data.heroDiagramUrl} onChange={(e) => set("heroDiagramUrl", e.target.value)} />
        </Field>
        <Field label="Education — Degree">
          <Input value={data.education.degree} onChange={(e) => setEducation("degree", e.target.value)} />
        </Field>
        <Field label="Education — Focus">
          <Input value={data.education.focus} onChange={(e) => setEducation("focus", e.target.value)} />
        </Field>
      </div>

      <Field label="Short Bio (hero section)">
        <Textarea rows={3} value={data.shortBio} onChange={(e) => set("shortBio", e.target.value)} />
      </Field>
      <Field label="Full Bio (about section)">
        <Textarea rows={5} value={data.fullBio} onChange={(e) => set("fullBio", e.target.value)} />
      </Field>
      <Field label="Career Goal">
        <Textarea rows={3} value={data.careerGoal} onChange={(e) => set("careerGoal", e.target.value)} />
      </Field>

      {saveState === "error" && (
        <div className="p-3 bg-error-container/25 border border-error/25 rounded-xl text-on-error-container text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
        </div>
      )}

      <Button onClick={handleSave} disabled={saveState === "saving"} className="flex items-center gap-2">
        {saveState === "saving" ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
        ) : saveState === "saved" ? (
          <><CheckCircle className="w-4 h-4" /> Saved</>
        ) : (
          <><Save className="w-4 h-4" /> Save Changes</>
        )}
      </Button>
    </div>
  );
}
