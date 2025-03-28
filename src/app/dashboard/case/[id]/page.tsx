"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";

const allViolations = [
    // Civil Law Violations
    "Breach of Contract",
    "Fraud / Misrepresentation",
    "Negligence / Personal Injury",
    "Landlord-Tenant Violation (RCW 59.18)",
    "Unlawful Detainer / Eviction",
    "Civil Harassment / Stalking",
    "Workplace Discrimination",
    "Wrongful Termination",
    "Property Damage / Trespass",
    "Defamation / Slander",
  
    // Constitutional Law
    "Due Process (Procedural)",
    "Due Process (Substantive)",
    "Equal Protection",
    "Free Speech Violation",
    "Access to Courts (First Amendment)",
  
    // Civil Rights (Federal Statutes)
    "ADA Title II (42 U.S.C. § 12132)",
    "§ 1983 – Deprivation of Rights",
    "§ 504 Rehabilitation Act Violation",
    "Retaliation (for protected activity)",
  
    // Judicial Misconduct
    "Bias / Hostility on Record",
    "Denial of Fair Hearing",
    "Ex Parte Communication",
    "Obstruction of Motions",
    "Judicial Retaliation",
  
    // Attorney / Court Staff Misconduct
    "Conflict of Interest",
    "Procedural Obstruction",
    "Denial of Filing",
    "Misuse of Protective Order",
    "Interference with Client Communication",
  ];

  const allRelief = [
    // Injunctive / Emergency Relief
    "Temporary Restraining Order (TRO)",
    "Preliminary Injunction",
    "Permanent Injunction",
    "Order to Show Cause",
  
    // Custody / Family Law Relief
    "Emergency Custody Order",
    "Return of Child",
    "Modified Parenting Plan",
    "Supervised Visitation",
    "Protection Order",
  
    // Civil / Constitutional Remedies
    "Monetary Damages",
    "Declaratory Relief",
    "Judicial Recusal",
    "Finding of Misconduct",
    "Attorney’s Fees and Costs",
  
    // Other Requested Relief
    "Access to Filing System",
    "Interpreter / ADA Accommodation",
    "Case Consolidation",
    "Public Hearing Request"
  ];
  
  

export default function CasePage() {
  const { id } = useParams() as { id: string };
  const [caseData, setCaseData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

   const [newParty, setNewParty] = useState({ name: "", role: "" });
    const [newViolation, setNewViolation] = useState("");
    const [newRelief, setNewRelief] = useState("");
    const [newEvent, setNewEvent] = useState({ date: "", title: "", description: "" });

  // Fetch case data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/case/${id}`);
        const json = await res.json();
        if (!json || json.error) {
          setCaseData(null);
        } else {
          setCaseData(json);
        }
      } catch (error) {
        console.error("Error loading case:", error);
        setCaseData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <div className="p-6">Loading case...</div>;
  if (!caseData) return notFound();

  const { caseDetails, parties, violations, timeline, relief } = caseData;

  return (
    <div className="p-6 space-y-8">
      {/* Header and Edit Toggle */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{caseDetails?.caseName || "Untitled Case"}</h1>
        <button
          className="bg-primary text-white px-4 py-1 rounded text-sm"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel Edit" : "Edit Case"}
        </button>
      </div>

      {/* Case Details */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Case Details</h2>
        {editMode ? (
          <div className="space-y-2">
            <input
              type="text"
              value={caseDetails?.caseNumber || ""}
              onChange={(e) =>
                setCaseData({
                  ...caseData,
                  caseDetails: { ...caseDetails, caseNumber: e.target.value },
                })
              }
              className="border p-2 rounded w-full"
              placeholder="Case Number"
            />
            <input
              type="text"
              value={caseDetails?.status || ""}
              onChange={(e) =>
                setCaseData({
                  ...caseData,
                  caseDetails: { ...caseDetails, status: e.target.value },
                })
              }
              className="border p-2 rounded w-full"
              placeholder="Case Status"
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-4">
            Case Number: {caseDetails?.caseNumber || "N/A"} <br />
            Status: {caseDetails?.status || "N/A"}
          </p>
        )}
      </section>
      <section>
  <h2 className="text-xl font-semibold mb-2">Parties</h2>

  {editMode ? (
    <div className="space-y-4">
      {caseData.parties?.map((p: any, i: number) => (
        <div key={i} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <input
            type="text"
            value={p.name}
            onChange={(e) => {
              const updated = [...caseData.parties];
              updated[i].name = e.target.value;
              setCaseData({ ...caseData, parties: updated });
            }}
            className="border p-2 rounded w-full sm:w-1/2"
            placeholder="Name"
          />
          <input
            type="text"
            value={p.role}
            onChange={(e) => {
              const updated = [...caseData.parties];
              updated[i].role = e.target.value;
              setCaseData({ ...caseData, parties: updated });
            }}
            className="border p-2 rounded w-full sm:w-1/2"
            placeholder="Role"
          />
        </div>
      ))}

      {/* Add New Party Row */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <input
          type="text"
          placeholder="New Party Name"
          className="border p-2 rounded w-full sm:w-1/2"
          onChange={(e) => setCaseData((prev: any) => ({ ...prev, newPartyName: e.target.value }))}
        />
        <input
          type="text"
          placeholder="New Party Role"
          className="border p-2 rounded w-full sm:w-1/2"
          onChange={(e) => setCaseData((prev: any) => ({ ...prev, newPartyRole: e.target.value }))}
        />
        <button
          onClick={() => {
            if (!caseData.newPartyName || !caseData.newPartyRole) return;
            const newParty = {
              name: caseData.newPartyName,
              role: caseData.newPartyRole,
            };
            setCaseData({
              ...caseData,
              parties: [...(caseData.parties || []), newParty],
              newPartyName: "",
              newPartyRole: "",
            });
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Party
        </button>
      </div>
    </div>
  ) : (
    <ul className="list-disc ml-5">
      {parties?.map((p: any, i: number) => (
        <li key={i}>
          <strong>{p.role}</strong>: {p.name}
        </li>
      ))}
    </ul>
  )}
</section>
<section>
  <h2 className="text-xl font-semibold mb-2">Violations</h2>

  {editMode ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {allViolations.map((v) => (
        <label key={v} className="flex items-center space-x-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={caseData.violations?.includes(v)}
            onChange={() => {
              const current = caseData.violations || [];
              const updated = current.includes(v)
                ? current.filter((item: string) => item !== v)
                : [...current, v];
              setCaseData({ ...caseData, violations: updated });
            }}
          />
          <span>{v}</span>
        </label>
      ))}
    </div>
  ) : (
    <ul className="list-disc ml-5">
      {violations?.map((v: string, i: number) => (
        <li key={i}>{v}</li>
      )) || <p>No violations selected.</p>}
    </ul>
  )}
</section>
<section>
  <h2 className="text-xl font-semibold mb-2">Timeline of Events</h2>

  {editMode ? (
    <div className="space-y-4">
      {caseData.timeline?.map((event: any, i: number) => (
        <div key={i} className="space-y-2 border border-muted p-4 rounded-md">
          <input
            type="date"
            value={event.date}
            onChange={(e) => {
              const updated = [...caseData.timeline];
              updated[i].date = e.target.value;
              setCaseData({ ...caseData, timeline: updated });
            }}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Event title"
            value={event.title}
            onChange={(e) => {
              const updated = [...caseData.timeline];
              updated[i].title = e.target.value;
              setCaseData({ ...caseData, timeline: updated });
            }}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Detailed description"
            value={event.description}
            onChange={(e) => {
              const updated = [...caseData.timeline];
              updated[i].description = e.target.value;
              setCaseData({ ...caseData, timeline: updated });
            }}
            className="border p-2 rounded w-full min-h-[100px]"
          />
        </div>
      ))}

      {/* Add New Event */}
      <div className="space-y-2 pt-4 border-t">
        <h4 className="font-medium">Add New Event</h4>
        <input
          type="date"
          className="border p-2 rounded w-full"
          onChange={(e) => setCaseData((prev: any) => ({ ...prev, newEventDate: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Event title"
          className="border p-2 rounded w-full"
          onChange={(e) => setCaseData((prev: any) => ({ ...prev, newEventTitle: e.target.value }))}
        />
        <textarea
          placeholder="Event description"
          className="border p-2 rounded w-full min-h-[80px]"
          onChange={(e) => setCaseData((prev: any) => ({ ...prev, newEventDesc: e.target.value }))}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={() => {
            if (!caseData.newEventDate || !caseData.newEventTitle || !caseData.newEventDesc) return;
            const newEvent = {
              date: caseData.newEventDate,
              title: caseData.newEventTitle,
              description: caseData.newEventDesc,
            };
            setCaseData({
              ...caseData,
              timeline: [...(caseData.timeline || []), newEvent],
              newEventDate: "",
              newEventTitle: "",
              newEventDesc: "",
            });
          }}
        >
          Add Event
        </button>
      </div>
    </div>
  ) : (
    <ul className="space-y-2">
      {timeline?.map((event: any, i: number) => (
        <li key={i} className="border-l-4 border-blue-500 pl-4">
          <p className="text-sm text-muted-foreground">{event.date}</p>
          <h4 className="font-semibold">{event.title}</h4>
          <p className="text-sm">{event.description}</p>
        </li>
      ))}
    </ul>
  )}
</section>
<section>
  <h2 className="text-xl font-semibold mb-2">Requested Relief</h2>

  {editMode ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {allRelief.map((r) => (
        <label key={r} className="flex items-center space-x-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={caseData.relief?.includes(r)}
            onChange={() => {
              const current = caseData.relief || [];
              const updated = current.includes(r)
                ? current.filter((item: string) => item !== r)
                : [...current, r];
              setCaseData({ ...caseData, relief: updated });
            }}
          />
          <span>{r}</span>
        </label>
      ))}
    </div>
  ) : (
    <ul className="list-disc ml-5">
      {relief?.map((r: string, i: number) => <li key={i}>{r}</li>) || <p>No relief specified.</p>}
    </ul>
  )}
</section>




      {/* Save Button */}
      {editMode && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            const res = await fetch(`/api/case/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(caseData),
            });

            const json = await res.json();
            if (json.success) {
              alert("✅ Case updated!");
              setEditMode(false);
            } else {
              alert("❌ Update failed.");
            }
          }}
        >
          Save Changes
        </button>
      )}
    </div>
  );
}
