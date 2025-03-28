"use client";

import { useState } from "react";
import { saveCaseData } from "@/lib/saveCase";
import { Button } from "@/components/ui/button";
import { useCase } from "@/context/CaseContext";
import { Checkbox } from "@/components/ui/checkbox";

const reliefOptions = {
  "Injunctive / Emergency Relief": [
    "Temporary Restraining Order (TRO)",
    "Preliminary Injunction",
    "Permanent Injunction",
    "Order to Show Cause"
  ],
  "Custody / Family Law Relief": [
    "Emergency Custody Order",
    "Return of Child",
    "Modified Parenting Plan",
    "Supervised Visitation",
    "Protection Order"
  ],
  "Civil / Constitutional Remedies": [
    "Monetary Damages",
    "Declaratory Relief",
    "Judicial Recusal",
    "Finding of Misconduct",
    "Attorney’s Fees and Costs"
  ],
  "Other Requested Relief": [
    "Access to Filing System",
    "Interpreter / ADA Accommodation",
    "Case Consolidation",
    "Public Hearing Request"
  ]
};

export default function Step5_Relief() {
  const { caseData, setCaseData } = useCase();
  const selectedRelief = caseData.relief || [];
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    try {
      const res = await fetch("/api/save-case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(caseData),
      });
  
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Unknown error");
  
      alert(`✅ Case saved! ID: ${json.id}`);
    } catch (err: any) {
      alert(`❌ Failed to save case: ${err.message}`);
    }
  };
  

  const toggleRelief = (value: string) => {
    const updated = selectedRelief.includes(value)
      ? selectedRelief.filter((v) => v !== value)
      : [...selectedRelief, value];
    setCaseData({ ...caseData, relief: updated });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Step 5: Requested Relief</h2>
      <p className="text-muted-foreground">
        Select all remedies you are asking the court to grant based on your claims and situation.
      </p>

      <div className="border p-4 rounded-lg max-h-[30rem] overflow-y-auto space-y-4 bg-muted/30">
        {Object.entries(reliefOptions).map(([group, items]) => (
          <div key={group}>
            <h4 className="text-sm font-semibold mb-2">{group}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {items.map((item) => (
                <label
                  key={item}
                  className="flex items-center space-x-2 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={selectedRelief.includes(item)}
                    onCheckedChange={() => toggleRelief(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleSave} className="mt-4">
        Save My Case
      </Button>

      {saved && (
        <p className="text-green-600 font-medium pt-4">
          ✅ Case saved successfully!
        </p>
      )}
      {error && (
        <p className="text-red-600 font-medium pt-4">
          ❌ {error}
        </p>
      )}
    </div>
  );
}
