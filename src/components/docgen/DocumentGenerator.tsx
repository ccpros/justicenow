"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function DocumentGenerator({ caseId }: { caseId: string }) {
  const [caseData, setCaseData] = useState<any | null>(null);
  const [template, setTemplate] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/case/${caseId}`)
      .then((res) => res.json())
      .then((data) => setCaseData(data));
  }, [caseId]);

  const templates = [
    "Writ of Mandamus",
    "Emergency Custody Motion",
    "Civil Rights Complaint",
    "Judicial Misconduct Report",
    "Custom Legal Letter",
  ];

  const handleGenerate = async () => {
    if (!template || !caseData) return alert("Please select a template.");

    setLoading(true);
    const res = await fetch("/api/generate-document", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ template, caseData }),
    });

    const data = await res.json();
    setGeneratedText(data.text);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Document Generator</h2>
      <p>Select a legal document type to auto-generate from your case data.</p>

      <div className="space-y-2">
        <label className="font-medium">Choose Template</label>
        <Select value={template} onValueChange={setTemplate}>
          <SelectTrigger>
            <SelectValue placeholder="Select a document type" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleGenerate} disabled={loading || !template}>
        {loading ? "Generating..." : "Generate Document"}
      </Button>

      {generatedText && (
        <div className="space-y-4 mt-6">
          <h3 className="text-xl font-semibold">Preview</h3>
          <Textarea value={generatedText} readOnly rows={20} className="w-full" />
          <Button onClick={() => navigator.clipboard.writeText(generatedText)}>
            Copy to Clipboard
          </Button>
        </div>
      )}
    </div>
  );
}
