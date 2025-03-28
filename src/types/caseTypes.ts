// src/types/caseTypes.ts
export interface Party {
    name: string;
    role: string;
  }
  
  export interface Case {
    caseName: string;
    caseNumber: string;
    status: string;
    parties: Party[];
    violations: string[];
    relief: string[];
    timeline: { date: string; title: string; description: string }[];
  }
  