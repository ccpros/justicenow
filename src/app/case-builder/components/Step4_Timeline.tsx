"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export default function Step4_Timeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addEvent = () => {
    if (!date || !title || !description) return;
    setEvents([...events, { date, title, description }]);
    setDate("");
    setTitle("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Step 4: Timeline of Events</h2>
      <p className="text-muted-foreground">
        Add each key event in your case. These help build the narrative and support your legal claims.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Judge denied motion without hearing"
          />
        </div>
        <div className="sm:col-span-3">
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed explanation of the event and who was involved."
          />
        </div>
      </div>

      <Button onClick={addEvent}>Add Event</Button>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Timeline</h3>
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground">No events added yet.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event, idx) => (
              <li key={idx} className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm text-muted-foreground">{event.date}</p>
                <h4 className="font-semibold text-base">{event.title}</h4>
                <p className="text-sm">{event.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
