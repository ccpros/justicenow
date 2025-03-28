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
  const selectedRelief = caseData?.relief || [];

  const toggleRelief = (value: string) => {
    const updated = selectedRelief.includes(value)
      ? selectedRelief.filter((v: string) => v !== value)
      : [...selectedRelief, value];

    setCaseData({
      ...caseData,
      relief: updated,
      caseName: caseData?.caseName || "",  // Default to empty string if undefined
      caseNumber: caseData?.caseNumber || "",  // Default to empty string if undefined
      status: caseData?.status || "",  // Default to empty string if undefined
      parties: caseData?.parties || [],  // Default to empty array if undefined
      violations: caseData?.violations || [],  // Default to empty array if undefined
      timeline: caseData?.timeline || []  // Default to empty array if undefined
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Step 5: Requested Relief</h2>
      <div className="border p-4 rounded-lg max-h-[30rem] overflow-y-auto space-y-4 bg-muted/30">
        {Object.entries(reliefOptions).map(([group, items]) => (
          <div key={group}>
            <h4 className="text-sm font-semibold mb-2">{group}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {items.map((item: string) => (
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
}
