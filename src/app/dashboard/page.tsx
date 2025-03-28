"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Home, FilePlus2, LayoutDashboard } from "lucide-react";
import MyCasesClient from "@/components/dashboard/MyCasesClient";
import CaseEditor from "@/components/dashboard/CaseEditor";

const tabs = [
  "My Cases",
  "Draft Documents",
  "AI Assistant",
  "Legal Research",
  "Law Library",
  "Case Details",
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("My Cases");
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen relative">
      {/* User Button in upper right */}
      <SignedIn>
        <div className="absolute top-4 right-4 z-50">
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>

      {/* Sidebar Navigation */}
      <SignedIn>
        <aside className="md:w-72 bg-muted/40 border-r border-border p-4 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Navigation</h2>
            <div className="space-y-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Home className="w-4 h-4 mr-2" /> Home
                </Button>
              </Link>
              <Link href="/case-builder">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <FilePlus2 className="w-4 h-4 mr-2" /> Start Case
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => setActiveTab("My Cases")}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            {tabs.map((tab) =>
              tab === "Case Details" && !activeCaseId ? null : (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Button>
              )
            )}
          </div>
        </aside>
      </SignedIn>

      {/* Main Content */}
      <SignedOut>
        <div className="w-full min-h-screen p-8 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">You must be signed in to view your dashboard.</h2>
          <SignInButton>
            <Button variant="default">Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "My Cases" && (
            <MyCasesClient
              onSelectCase={(id) => {
                console.log("✅ Case selected:", id);
                setActiveCaseId(id);
                setActiveTab("Case Details");
              }}
            />
          )}

          {activeTab === "Case Details" && activeCaseId && (
            <CaseEditor id={activeCaseId} />
          )}

          {activeTab === "Draft Documents" && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Document Drafting</h3>
              <p className="text-muted-foreground">Start new filings and auto-generate forms.</p>
            </div>
          )}

          {activeTab === "AI Assistant" && (
            <div>
              <h3 className="text-2xl font-bold mb-4">JusticeNow AI Assistant</h3>
              <p className="text-muted-foreground">Ask legal questions, get writing help, and more.</p>
            </div>
          )}

          {activeTab === "Legal Research" && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Legal Research</h3>
              <p className="text-muted-foreground">Search case law, statutes, and analyze results.</p>
            </div>
          )}

          {activeTab === "Law Library" && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Custom Law Library</h3>
              <p className="text-muted-foreground">Your curated collection of relevant laws, rules, and notes.</p>
            </div>
          )}
        </main>
      </SignedIn>
    </div>
  );
}
