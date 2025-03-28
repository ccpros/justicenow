"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Checkbox,
} from "@/components/ui/checkbox";

const jurisdictions = {
  "Washington State Superior Courts": [
    "King County Superior Court",
    "Thurston County Superior Court",
    "Pierce County Superior Court",
    "Snohomish County Superior Court",
    "Clark County Superior Court",
    "Yakima County Superior Court",
    "Spokane County Superior Court",
    "Whatcom County Superior Court",
    "Skagit County Superior Court",
    "Benton County Superior Court",
    "Kitsap County Superior Court",
    "Cowlitz County Superior Court",
    "Grays Harbor Superior Court",
    "Grant County Superior Court",
    "Chelan County Superior Court",
    "Island County Superior Court",
    "Lewis County Superior Court",
    "Mason County Superior Court",
    "Walla Walla County Superior Court",
    "Clallam County Superior Court",
    "Franklin County Superior Court",
    "Pacific County Superior Court",
    "Jefferson County Superior Court",
    "Whitman County Superior Court",
    "Douglas County Superior Court",
    "Okanogan County Superior Court",
    "Kittitas County Superior Court",
    "Skamania County Superior Court",
    "Stevens County Superior Court",
    "San Juan County Superior Court",
    "Ferry County Superior Court",
    "Columbia County Superior Court",
    "Wahkiakum County Superior Court",
    "Garfield County Superior Court",
    "Lincoln County Superior Court",
    "Asotin County Superior Court",
    "Adams County Superior Court",
    "Pend Oreille County Superior Court"
  ],
  "WA Appellate Courts": [
    "Court of Appeals Division I",
    "Court of Appeals Division II",
    "Court of Appeals Division III",
    "Washington State Supreme Court"
  ],
  "Federal Courts": [
    "U.S. District Court – Western District of Washington",
    "U.S. District Court – Eastern District of Washington",
    "U.S. Court of Appeals – Ninth Circuit",
    "U.S. Bankruptcy Court – Western District",
    "U.S. Bankruptcy Court – Eastern District",
    "U.S. DOJ – ADA/Title II (Administrative Review)"
  ]
};

const caseTypes = {
  "Civil": [
    "Breach of Contract",
    "Fraud / Misrepresentation",
    "Negligence / Personal Injury",
    "Landlord-Tenant",
    "Unlawful Detainer / Eviction",
    "Defamation",
    "Employment Dispute",
    "Administrative Appeal"
  ],
  "Family": [
    "Custody / Visitation",
    "Parenting Plan Modification",
    "Child Support",
    "Guardianship",
    "Protection Order",
    "Paternity / Parentage"
  ],
  "Criminal / Quasi-Criminal": [
    "Criminal Complaint",
    "Post-Conviction Motion",
    "Contempt / Sanctions",
    "Protection Order Violation"
  ],
  "Constitutional / Civil Rights": [
    "ADA / Disability Discrimination",
    "Due Process Challenge",
    "Equal Protection Claim",
    "42 U.S.C. § 1983",
    "Retaliation for Protected Activity"
  ]
};

export default function Step2_CaseDetails() {
  const [caseName, setCaseName] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [status, setStatus] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>([]);
  const [selectedCaseTypes, setSelectedCaseTypes] = useState<string[]>([]);

  const toggleJurisdiction = (value: string) => {
    setSelectedJurisdictions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleCaseType = (value: string) => {
    setSelectedCaseTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Step 2: Case Details</h2>
      <p className="text-muted-foreground">
        Provide basic information about the case. This helps with document generation and jurisdiction-based logic.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Case Name</Label>
          <Input
            value={caseName}
            onChange={(e) => setCaseName(e.target.value)}
            placeholder="e.g. Cornett v. Gardner"
          />
        </div>

        <div>
          <Label>Case Number</Label>
          <Input
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            placeholder="e.g. 23-3-00527-34"
          />
        </div>

        <div>
          <Label>Case Status</Label>
          <Input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="e.g. Open, Pending, Dismissed"
          />
        </div>
      </div>

      <div>
        <Label>Case Type(s)</Label>
        <div className="border p-4 rounded-lg max-h-72 overflow-y-auto space-y-4 bg-muted/30">
          {Object.entries(caseTypes).map(([group, types]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold mb-2">{group}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {types.map((type) => (
                  <label
                    key={type}
                    className="flex items-center space-x-2 text-sm cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedCaseTypes.includes(type)}
                      onCheckedChange={() => toggleCaseType(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Jurisdiction(s)</Label>
        <div className="border p-4 rounded-lg max-h-72 overflow-y-auto space-y-4 bg-muted/30">
          {Object.entries(jurisdictions).map(([group, courts]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold mb-2">{group}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {courts.map((court) => (
                  <label
                    key={court}
                    className="flex items-center space-x-2 text-sm cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedJurisdictions.includes(court)}
                      onCheckedChange={() => toggleJurisdiction(court)}
                    />
                    <span>{court}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Brief Summary</Label>
        <Textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Describe what happened in a few sentences..."
        />
      </div>
    </div>
  );
}