"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCase } from "@/context/CaseContext";

interface Party {
  name: string;
  role: string;
}

const roleOptions: Record<string, string[]> = {
  Defendant: ["Self", "Other Party", "Client"],
  Plaintiff: ["Self", "Other Party", "Client"],
  Witness: ["Fact Witness", "Expert Witness", "Hostile Witness"],
  "Legal Professional": [
    "Attorney (Plaintiff)",
    "Attorney (Defendant)",
    "Prosecutor",
    "Guardian ad Litem",
    "Court Investigator",
  ],
  "Judicial Officer": ["Judge", "Commissioner", "Magistrate"],
  "Government / Enforcement": ["Law Enforcement", "CPS", "Social Worker"],
  "Family Member": ["Parent", "Child", "Guardian", "Relative"],
  "Other": ["Landlord", "Employer", "School Official", "Medical Provider"],
};

export default function Step1_Parties() {
  const { caseData, setCaseData } = useCase();
const parties = caseData.parties;

  const [name, setName] = useState("");
  const [mainRole, setMainRole] = useState("");
  const [subRole, setSubRole] = useState("");

  const addParty = () => {
    if (!name || !mainRole || !subRole) return;
  
    const newParty = { name, role: `${mainRole} - ${subRole}` };
    const updated = [...caseData.parties, newParty];
  
    setCaseData({ ...caseData, parties: updated });
  
    setName("");
    setMainRole("");
    setSubRole("");
  };
  

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Step 1: Add Parties</h2>
        <p className="text-muted-foreground">
          Enter the people or entities involved in your case, along with their roles.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Robin Cornett"
          />
        </div>

        <div>
          <Label>Main Role</Label>
          <Select value={mainRole} onValueChange={(val) => {
            setMainRole(val);
            setSubRole(""); // Reset sub-role when main role changes
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Choose role category" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(roleOptions).map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {mainRole && (
          <div className="sm:col-span-2">
            <Label>Sub-Role</Label>
            <Select value={subRole} onValueChange={setSubRole}>
              <SelectTrigger>
                <SelectValue placeholder={`Choose ${mainRole} sub-role`} />
              </SelectTrigger>
              <SelectContent>
                {roleOptions[mainRole].map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Button onClick={addParty}>Add Party</Button>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Parties Added:</h3>
        {parties.length === 0 ? (
          <p className="text-sm text-muted-foreground">No parties added yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {parties.map((party, index) => (
              <li key={index}>
                <strong>{party.role}:</strong> {party.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
