// Thin fetch wrapper the admin panel uses to talk to the Express backend.
// Uses the same NEXT_PUBLIC_API_URL the contact form already relies on.

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    // no JSON body (e.g. network-level failure) — fall through to the error below
  }

  const parsed = body as { success?: boolean; message?: string; data?: T } | null;

  if (!res.ok || !parsed?.success) {
    throw new Error(parsed?.message || `Request failed (${res.status})`);
  }

  return parsed.data as T;
}

// ---- Site content (hero / about / contact info) ----
export const getContent = () => request<any>("/api/content");
export const updateContent = (data: any) =>
  request<any>("/api/content", { method: "PUT", body: JSON.stringify(data) });

// ---- Skill categories ----
export const getSkills = () => request<any[]>("/api/skills");
export const createSkill = (data: any) =>
  request<any>("/api/skills", { method: "POST", body: JSON.stringify(data) });
export const updateSkill = (id: string, data: any) =>
  request<any>(`/api/skills/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteSkill = (id: string) =>
  request<any>(`/api/skills/${id}`, { method: "DELETE" });

// ---- Projects ----
export const getProjects = () => request<any[]>("/api/projects");
export const createProject = (data: any) =>
  request<any>("/api/projects", { method: "POST", body: JSON.stringify(data) });
export const updateProject = (id: string, data: any) =>
  request<any>(`/api/projects/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteProject = (id: string) =>
  request<any>(`/api/projects/${id}`, { method: "DELETE" });
