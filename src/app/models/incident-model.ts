

import { Update } from "./update";

// suggestion model

export interface Incident {
  id: number;
  title: string;
  description: string;
  status: string;
  severity: string;
  assignee: string;
  escalatedTo:string;
  escalated: boolean;
  escalatedToEmail?: string;
  escalatedBy?: string;
  affectedSystem: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  updates?: Update[];
}


  