"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CaseData = {
  parties: any[];
  caseDetails: any;
  violations: string[];
  timeline: any[];
  relief: string[];
};

const defaultData: CaseData = {
  parties: [],
  caseDetails: {},
  violations: [],
  timeline: [],
  relief: [],
};

const CaseContext = createContext<{
  caseData: CaseData;
  setCaseData: React.Dispatch<React.SetStateAction<CaseData>>;
}>({
  caseData: defaultData,
  setCaseData: () => {},
});

export function useCase() {
  return useContext(CaseContext);
}

export function CaseProvider({ children }: { children: ReactNode }) {
  const [caseData, setCaseData] = useState<CaseData>(defaultData);

  return (
    <CaseContext.Provider value={{ caseData, setCaseData }}>
      {children}
    </CaseContext.Provider>
  );
}
