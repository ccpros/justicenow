// src/types/caseTypes.ts
export interface Party {
    name: string;
    role: string;
  }
  
 // src/types/caseTypes.ts
export interface Case {
    caseName?: string;  // Make this field optional
    caseNumber?: string;  // Make this field optional
    status?: string;  // Make this field optional
    parties: Party[];
    violations: string[];
    relief: string[];
    timeline: { date: string; title: string; description: string }[];
  }
  
  