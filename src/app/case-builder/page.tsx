import CaseWizard from "./components/CaseWizard";

export default function CaseBuilderPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">🧩 Build Your Legal Case</h1>
        <p className="text-muted-foreground text-center">
          We'll guide you step by step through facts, violations, and legal strategy.
        </p>

        {/* Wizard will render here */}
        <div className="border rounded-xl p-6 shadow-md bg-card">
          <CaseWizard />
        </div>
      </div>
    </main>
  );
}

  