// src/context/CaseContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";
import { Case } from "../types/caseTypes";

// Define the types for the CaseContext
interface CaseContextType {
  caseData: Case | null;
  setCaseData: React.Dispatch<React.SetStateAction<Case | null>>;
}

export const CaseContext = createContext<CaseContextType>({
  caseData: null,
  setCaseData: () => {},
});

interface CaseProviderProps {
  children: ReactNode;
}

export const CaseProvider: React.FC<CaseProviderProps> = ({ children }) => {
  const [caseData, setCaseData] = useState<Case | null>(null);

  return (
    <CaseContext.Provider value={{ caseData, setCaseData }}>
      {children}
    </CaseContext.Provider>
  );
};

// Define the useCase hook to access case data
export const useCase = () => useContext(CaseContext);
