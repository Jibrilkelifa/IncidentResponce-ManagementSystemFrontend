import { Update } from "./update";

export interface Incident {
  id: number;
  title: string;
  description: string;
  recommendedAction: string;
  status: string;
  severity: string;
  assignee: string;
  escalatedTo: string[]; // Changed to an array of names for multiple users
  escalated: boolean;
  escalatedToEmails?: string[]; // Array of emails for multiple users
  escalatedToPhones?: string[]; // Array of phone numbers for multiple users
  escalatedBy?: string;
  affectedSystems: string[];
  sources: string[];
  createdAt: Date;
  updatedAt: Date;
  updates?: Update[];
}
