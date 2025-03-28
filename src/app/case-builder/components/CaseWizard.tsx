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
    <div>
      {step === 1 && <Step1_Parties />}
      {step === 2 && <Step2_CaseDetails />}
      {step === 3 && <Step3_Violations />}
      {step === 4 && <Step4_Timeline />}
      {step === 5 && <Step5_Relief />}

      <div className="mt-6 flex justify-between">
        <button
          onClick={back}
          disabled={step === 1}
          className="text-muted-foreground hover:text-foreground"
        >
          ◀ Back
        </button>
        <button
          onClick={next}
          disabled={step === 5}
          className="font-semibold text-blue-600 hover:text-blue-800"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
