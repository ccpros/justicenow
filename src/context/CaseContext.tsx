// src/context/CaseContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { Case } from "../types/caseTypes";

// Define CaseContext and type for children
export const CaseContext = createContext<{
  caseData: Case | null;
  setCaseData: React.Dispatch<React.SetStateAction<Case | null>>;
}>({
  caseData: null,
  setCaseData: () => {},
});

// Fixing the CaseProvider to accept children as a prop
export const CaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [caseData, setCaseData] = useState<Case | null>(null);

  return (
    <CaseContext.Provider value={{ caseData, setCaseData }}>
      {children}
    </CaseContext.Provider>
  );
};
