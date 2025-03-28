"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
  const [selectedRelief, setSelectedRelief] = useState<string[]>([]);

  const toggleRelief = (value: string) => {
    setSelectedRelief((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
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
    </div>
  );
}
