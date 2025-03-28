"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CaseEditor({ id }: { id: string }) {
  const [caseData, setCaseData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [newParty, setNewParty] = useState({ name: "", role: "" });
  const [newViolation, setNewViolation] = useState("");
  const [newRelief, setNewRelief] = useState("");
  const [newEvent, setNewEvent] = useState({ date: "", title: "", description: "" });

  useEffect(() => {
    fetch(`/api/case/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCaseData(data);
        setLoading(false);
      });
  }, [id]);

  const update = (field: string, value: any) => {
    setCaseData({ ...caseData, [field]: value });
  };

  const handleSave = async () => {
    // Example: Collecting all updated data
    const updatedCaseData = {
      ...caseData,
      caseName: caseData?.caseName || "",  // Ensure caseName is updated
      caseNumber: caseData?.caseNumber || "",  // Ensure caseNumber is updated
      status: caseData?.status || "",  // Ensure status is updated
    };
  
    // Save updated case data
    setCaseData(updatedCaseData);
  };
  if (loading || !caseData) return <p>Loading case data...</p>;

  const { caseDetails, parties = [], violations = [], timeline = [], relief = [] } = caseData;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{caseDetails?.caseName || "Edit Case"}</h1>
        <Button onClick={handleSave} className="bg-green-600 text-white hover:bg-green-700">
          Save Changes
        </Button>
      </div>

      {/* Case Details */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Case Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            value={caseDetails?.caseName || ""}
            onChange={(e) => update("caseDetails", { ...caseDetails, caseName: e.target.value })}
            placeholder="Case Name"
          />
          <Input
            value={caseDetails?.caseNumber || ""}
            onChange={(e) => update("caseDetails", { ...caseDetails, caseNumber: e.target.value })}
            placeholder="Case Number"
          />
          <Input
            value={caseDetails?.status || ""}
            onChange={(e) => update("caseDetails", { ...caseDetails, status: e.target.value })}
            placeholder="Status"
          />
        </div>
      </section>

      {/* Parties */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Parties</h2>
        <ul className="space-y-1 mb-2">
          {parties.map((p: any, i: number) => (
            <li key={i} className="flex justify-between items-center">
              <span>{p.role}: {p.name}</span>
              <Button variant="ghost" size="sm" onClick={() => update("parties", parties.filter((_: any, idx: number) => idx !== i))}>❌</Button>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Input value={newParty.name} placeholder="Name" onChange={(e) => setNewParty({ ...newParty, name: e.target.value })} />
          <Input value={newParty.role} placeholder="Role" onChange={(e) => setNewParty({ ...newParty, role: e.target.value })} />
          <Button onClick={() => {
            update("parties", [...parties, newParty]);
            setNewParty({ name: "", role: "" });
          }}>Add</Button>
        </div>
      </section>

      {/* Violations */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Violations</h2>
        <ul className="space-y-1 mb-2">
          {violations.map((v: string, i: number) => (
            <li key={i} className="flex justify-between items-center">
              <span>{v}</span>
              <Button variant="ghost" size="sm" onClick={() => update("violations", violations.filter((_: any, idx: number) => idx !== i))}>❌</Button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Input value={newViolation} placeholder="Add Violation" onChange={(e) => setNewViolation(e.target.value)} />
          <Button onClick={() => {
            update("violations", [...violations, newViolation]);
            setNewViolation("");
          }}>Add</Button>
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Timeline</h2>
        <ul className="space-y-2 mb-2">
          {timeline.map((e: any, i: number) => (
            <li key={i} className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-muted-foreground">{e.date}</p>
              <p className="font-semibold">{e.title}</p>
              <p className="text-sm">{e.description}</p>
              <Button variant="ghost" size="sm" onClick={() => update("timeline", timeline.filter((_: any, idx: number) => idx !== i))}>❌ Remove</Button>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
          <Input value={newEvent.title} placeholder="Title" onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
          <Input value={newEvent.description} placeholder="Description" onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
          <Button className="col-span-1 sm:col-span-3" onClick={() => {
            update("timeline", [...timeline, newEvent]);
            setNewEvent({ date: "", title: "", description: "" });
          }}>Add Event</Button>
        </div>
      </section>

      {/* Relief */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Requested Relief</h2>
        <ul className="space-y-1 mb-2">
          {relief.map((r: string, i: number) => (
            <li key={i} className="flex justify-between items-center">
              <span>{r}</span>
              <Button variant="ghost" size="sm" onClick={() => update("relief", relief.filter((_: any, idx: number) => idx !== i))}>❌</Button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Input value={newRelief} placeholder="Add Relief" onChange={(e) => setNewRelief(e.target.value)} />
          <Button onClick={() => {
            update("relief", [...relief, newRelief]);
            setNewRelief("");
          }}>Add</Button>
        </div>
      </section>
    </div>
  );
}
