// src/app/case-builder/components/Step5_Relief.tsx

import { Checkbox } from "@/components/ui/checkbox";
import { useCase } from "@/context/CaseContext";

// Define types for the relief options
type ReliefOption = string; // You can replace `string` with the actual type if needed

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
  const selectedRelief = caseData?.relief || [];

  const toggleRelief = (value: string) => {
    const updated = selectedRelief.includes(value)
      ? selectedRelief.filter((v) => v !== value)
      : [...selectedRelief, value];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Step 5: Requested Relief</h2>
      <div className="border p-4 rounded-lg max-h-[30rem] overflow-y-auto space-y-4 bg-muted/30">
        {Object.entries(reliefOptions).map(([group, items]) => (
          <div key={group}>
            <h4 className="text-sm font-semibold mb-2">{group}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {items.map((item: ReliefOption) => (
                <label key={item} className="flex items-center space-x-2 text-sm cursor-pointer">
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
}}
