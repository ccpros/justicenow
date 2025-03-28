"use client";

import { useState } from "react";
import Step1_Parties from "./Step1_Parties";
import Step2_CaseDetails from "./Step2_CaseDetails";
import Step3_Violations from "./Step3_Violations";
import Step4_Timeline from "./Step4_Timeline";
import Step5_Relief from "./Step5_Relief";

export default function CaseWizard() {
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => Math.min(prev + 1, 5));
  const back = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {step === 1 && <Step1_Parties />}
      {step === 2 && <Step2_CaseDetails />}
      {step === 3 && <Step3_Violations />}
      {step === 4 && <Step4_Timeline />}
      {step === 5 && <Step5_Relief />}

      <div className="flex justify-between pt-4">
        <button
          onClick={back}
          disabled={step === 1}
          className="px-4 py-2 bg-muted text-sm rounded hover:bg-muted/60 disabled:opacity-50"
        >
          ◀ Back
        </button>
        <button
          onClick={next}
          disabled={step === 5}
          className="px-4 py-2 bg-primary text-white text-sm rounded hover:bg-primary/80 disabled:opacity-50"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
