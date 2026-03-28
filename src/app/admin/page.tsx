"use client";

import { useState, useCallback, useEffect } from "react";
import { compare } from "bcryptjs";
import {
  ADMIN_PASSWORD_HASH,
  GITHUB_REPO_OWNER,
  GITHUB_REPO_NAME,
  GITHUB_FILE_PATH,
  GITHUB_BRANCH,
} from "./constants";
import { validateServices } from "@/lib/validate-services";

// ─── Types ────────────────────────────────────────────────────
interface Service {
  name: string;
  duration: string;
  price: string;
  description?: string;
}

interface ServiceCategory {
  name: string;
  services: Service[];
}

// ─── Password Gate ────────────────────────────────────────────
function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setChecking(true);
    try {
      const match = await compare(password, ADMIN_PASSWORD_HASH);
      if (match) {
        sessionStorage.setItem("admin_auth", "1");
        onSuccess();
      } else {
        setError("Incorrect password");
      }
    } catch {
      setError("Error checking password");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Access</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          autoFocus
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          disabled={checking || !password}
          className="w-full mt-4 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          {checking ? "Checking..." : "Enter"}
        </button>
      </form>
    </div>
  );
}

// ─── Token Input ──────────────────────────────────────────────
function TokenSetup({ onToken }: { onToken: (token: string) => void }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setChecking(true);
    try {
      const res = await fetch("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        localStorage.setItem("github_token", token);
        onToken(token);
      } else {
        setError("Invalid token — could not authenticate with GitHub");
      }
    } catch {
      setError("Network error — check your connection");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">GitHub Token</h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter a GitHub personal access token with &quot;Contents: Write&quot; permission for the repo.
        </p>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ghp_xxxxxxxxxxxx"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono text-sm"
          autoFocus
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          disabled={checking || !token}
          className="w-full mt-4 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          {checking ? "Verifying..." : "Connect"}
        </button>
      </form>
    </div>
  );
}

// ─── Service Row Editor ───────────────────────────────────────
function ServiceRow({
  service,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  service: Service;
  onChange: (updated: Service) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px_120px] gap-2">
        <input
          type="text"
          value={service.name}
          onChange={(e) => onChange({ ...service, name: e.target.value })}
          placeholder="Service name"
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <input
          type="text"
          value={service.duration}
          onChange={(e) => onChange({ ...service, duration: e.target.value })}
          placeholder="e.g. 60 min"
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <input
          type="text"
          value={service.price}
          onChange={(e) => onChange({ ...service, price: e.target.value })}
          placeholder="e.g. $55"
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
      <input
        type="text"
        value={service.description ?? ""}
        onChange={(e) =>
          onChange({
            ...service,
            description: e.target.value || undefined,
          })
        }
        placeholder="Description (optional)"
        className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={isFirst}
          className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-30 rounded transition-colors"
        >
          Up
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={isLast}
          className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-30 rounded transition-colors"
        >
          Down
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

// ─── Category Editor ──────────────────────────────────────────
function CategoryEditor({
  category,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  category: ServiceCategory;
  onChange: (updated: ServiceCategory) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const updateService = (index: number, updated: Service) => {
    const services = [...category.services];
    services[index] = updated;
    onChange({ ...category, services });
  };

  const removeService = (index: number) => {
    const services = category.services.filter((_, i) => i !== index);
    onChange({ ...category, services });
  };

  const moveService = (index: number, direction: -1 | 1) => {
    const services = [...category.services];
    const target = index + direction;
    [services[index], services[target]] = [services[target], services[index]];
    onChange({ ...category, services });
  };

  const addService = () => {
    onChange({
      ...category,
      services: [
        ...category.services,
        { name: "", duration: "", price: "" },
      ],
    });
  };

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden">
      <div className="bg-gray-100 px-4 py-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-gray-700 text-sm font-mono w-6"
        >
          {collapsed ? "+" : "-"}
        </button>
        <input
          type="text"
          value={category.name}
          onChange={(e) => onChange({ ...category, name: e.target.value })}
          placeholder="Category name"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <span className="text-xs text-gray-400">{category.services.length} services</span>
        <button type="button" onClick={onMoveUp} disabled={isFirst} className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-30 rounded transition-colors">Up</button>
        <button type="button" onClick={onMoveDown} disabled={isLast} className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-30 rounded transition-colors">Down</button>
        <button type="button" onClick={onRemove} className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors">Remove</button>
      </div>
      {!collapsed && (
        <div className="p-4 space-y-3">
          {category.services.map((service, idx) => (
            <ServiceRow
              key={idx}
              service={service}
              onChange={(updated) => updateService(idx, updated)}
              onRemove={() => removeService(idx)}
              onMoveUp={() => moveService(idx, -1)}
              onMoveDown={() => moveService(idx, 1)}
              isFirst={idx === 0}
              isLast={idx === category.services.length - 1}
            />
          ))}
          <button
            type="button"
            onClick={addService}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-amber-400 hover:text-amber-600 transition-colors"
          >
            + Add Service
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Editor ──────────────────────────────────────────────
function ServiceEditor({ token }: { token: string }) {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [originalJson, setOriginalJson] = useState("");
  const [fileSha, setFileSha] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const apiBase = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_FILE_PATH}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
  };

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}?ref=${GITHUB_BRANCH}`, { headers });
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const data = await res.json();
      setFileSha(data.sha);
      const content = atob(data.content);
      setOriginalJson(content);
      setCategories(JSON.parse(content));
    } catch (err) {
      setStatus({ type: "error", message: `Failed to load services: ${err instanceof Error ? err.message : "Unknown error"}` });
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Live validation
  useEffect(() => {
    const result = validateServices(categories);
    setValidationErrors(result.errors);
  }, [categories]);

  const hasChanges = JSON.stringify(categories, null, 2) !== originalJson;

  const handleSave = async () => {
    // Final validation before save
    const result = validateServices(categories);
    if (!result.valid) {
      setValidationErrors(result.errors);
      setStatus({ type: "error", message: "Please fix validation errors before saving." });
      return;
    }

    setSaving(true);
    setStatus(null);
    try {
      const newContent = JSON.stringify(categories, null, 2) + "\n";
      const res = await fetch(apiBase, {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Update services and prices",
          content: btoa(unescape(encodeURIComponent(newContent))),
          sha: fileSha,
          branch: GITHUB_BRANCH,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `GitHub API error: ${res.status}`);
      }
      const data = await res.json();
      setFileSha(data.content.sha);
      setOriginalJson(newContent);
      setStatus({ type: "success", message: "Saved! The website will update in about 1 minute." });
    } catch (err) {
      setStatus({ type: "error", message: `Save failed: ${err instanceof Error ? err.message : "Unknown error"}` });
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (originalJson) {
      setCategories(JSON.parse(originalJson));
      setStatus(null);
    }
  };

  const updateCategory = (index: number, updated: ServiceCategory) => {
    const cats = [...categories];
    cats[index] = updated;
    setCategories(cats);
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const moveCategory = (index: number, direction: -1 | 1) => {
    const cats = [...categories];
    const target = index + direction;
    [cats[index], cats[target]] = [cats[target], cats[index]];
    setCategories(cats);
  };

  const addCategory = () => {
    setCategories([
      ...categories,
      { name: "", services: [{ name: "", duration: "", price: "" }] },
    ]);
  };

  const handleChangeToken = () => {
    localStorage.removeItem("github_token");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-lg font-bold text-gray-900">Services Editor</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleChangeToken}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Change token
          </button>
          <button
            type="button"
            onClick={handleDiscard}
            disabled={!hasChanges}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            Discard Changes
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !hasChanges || validationErrors.length > 0}
            className="px-6 py-2 text-sm bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-colors"
          >
            {saving ? "Saving..." : "Save & Deploy"}
          </button>
        </div>
      </div>

      {/* Status messages */}
      {status && (
        <div className={`mx-4 mt-4 p-4 rounded-lg text-sm ${status.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
          {status.message}
        </div>
      )}

      {/* Validation errors */}
      {validationErrors.length > 0 && (
        <div className="mx-4 mt-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
          <p className="text-sm font-semibold text-yellow-800 mb-2">Validation errors ({validationErrors.length}):</p>
          <ul className="text-sm text-yellow-700 space-y-1">
            {validationErrors.map((err, i) => (
              <li key={i}>- {err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Editor */}
      <div className="max-w-4xl mx-auto p-4 space-y-4 pb-20">
        {categories.map((category, idx) => (
          <CategoryEditor
            key={idx}
            category={category}
            onChange={(updated) => updateCategory(idx, updated)}
            onRemove={() => removeCategory(idx)}
            onMoveUp={() => moveCategory(idx, -1)}
            onMoveDown={() => moveCategory(idx, 1)}
            isFirst={idx === 0}
            isLast={idx === categories.length - 1}
          />
        ))}
        <button
          type="button"
          onClick={addCategory}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-amber-400 hover:text-amber-600 transition-colors font-semibold"
        >
          + Add Category
        </button>
      </div>
    </div>
  );
}

// ─── Page Root ────────────────────────────────────────────────
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "1") {
      setAuthenticated(true);
    }
    const savedToken = localStorage.getItem("github_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  if (!authenticated) {
    return <PasswordGate onSuccess={() => setAuthenticated(true)} />;
  }

  if (!token) {
    return <TokenSetup onToken={setToken} />;
  }

  return <ServiceEditor token={token} />;
}
