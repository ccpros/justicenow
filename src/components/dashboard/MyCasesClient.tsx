"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyCasesClient({ onSelectCase }: { onSelectCase?: (id: string) => void }) {

  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCases() {
      try {
        const res = await fetch("/api/user-cases");
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid case list format.");
        }

        setCases(data);
      } catch (err: any) {
        setError(err.message || "Failed to load cases.");
        setCases([]);
      } finally {
        setLoading(false);
      }
    }

    loadCases();
  }, []);

  if (loading) return <p className="text-sm text-muted-foreground">Loading your cases...</p>;
  if (error) return <p className="text-sm text-red-600">❌ {error}</p>;
  if (cases.length === 0) return <p className="text-sm text-muted-foreground">No saved cases yet.</p>;

  return (
    <ul className="space-y-4">
  {cases.map((c) => (
    <li key={c.id} className="p-4 border rounded shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{c.caseDetails?.caseName || "Untitled Case"}</h3>
          <p className="text-sm text-muted-foreground">
            Case #: {c.caseDetails?.caseNumber || "N/A"}
          </p>
        </div>

        <Link href="#" onClick={(e) => {
          e.preventDefault();
          onSelectCase?.(c.id);
        }}>
          <button className="text-sm px-3 py-1 rounded bg-primary text-white hover:bg-primary/80">
            View
          </button>
        </Link>
      </div>
    </li>
  ))}
</ul>

  );
}
