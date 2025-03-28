"use client";

import { useCase } from "@/context/CaseContext";
import { Checkbox } from "@/components/ui/checkbox";

const violations = {
  "Civil Law Violations": [
    "Breach of Contract",
    "Fraud / Misrepresentation",
    "Negligence / Personal Injury",
    "Landlord-Tenant Violation (RCW 59.18)",
    "Unlawful Detainer / Eviction",
    "Civil Harassment / Stalking",
    "Workplace Discrimination",
    "Wrongful Termination",
    "Property Damage / Trespass",
    "Defamation / Slander"
  ],
  "Constitutional Law": [
    "Due Process (Procedural)",
    "Due Process (Substantive)",
    "Equal Protection",
    "Free Speech Violation",
    "Access to Courts (First Amendment)"
  ],
  "Civil Rights (Federal Statutes)": [
    "ADA Title II (42 U.S.C. § 12132)",
    "§ 1983 – Deprivation of Rights",
    "§ 504 Rehabilitation Act Violation",
    "Retaliation (for protected activity)"
  ],
  "Judicial Misconduct": [
    "Bias / Hostility on Record",
    "Denial of Fair Hearing",
    "Ex Parte Communication",
    "Obstruction of Motions",
    "Judicial Retaliation"
  ],
  "Attorney / Court Staff Misconduct": [
    "Conflict of Interest",
    "Procedural Obstruction",
    "Denial of Filing",
    "Misuse of Protective Order",
    "Interference with Client Communication"
  ]
};

export default function Step3_Violations() {
  const { caseData, setCaseData } = useCase();
  const selectedViolations = caseData.violations || [];

  const toggleViolation = (value: string) => {
    const updated = selectedViolations.includes(value)
      ? selectedViolations.filter((v) => v !== value)
      : [...selectedViolations, value];
    setCaseData({ ...caseData, violations: updated });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Step 3: Legal Violations & Claims</h2>
      <p className="text-muted-foreground">
        Select any legal claims or violations that apply to your case. This will help generate legal arguments and filings later.
      </p>

      <div className="border p-4 rounded-lg max-h-[30rem] overflow-y-auto space-y-4 bg-muted/30">
        {Object.entries(violations).map(([group, items]) => (
          <div key={group}>
            <h4 className="text-sm font-semibold mb-2">{group}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {items.map((item) => (
                <label
                  key={item}
                  className="flex items-center space-x-2 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={selectedViolations.includes(item)}
                    onCheckedChange={() => toggleViolation(item)}
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
