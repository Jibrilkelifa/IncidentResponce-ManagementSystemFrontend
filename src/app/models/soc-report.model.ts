// src/app/models/soc-report.model.ts

import { IncidentEntry } from "./incident-entry.model";

export interface SOCReport {
  id?: number;           // Optional, will be assigned by the backend
  reportDate?: string;    // Date in string format (e.g., "2024-10-30")
  shift: string;          // Shift information (e.g., "Shift 1")
  incidents: IncidentEntry[]; // Array of incident entries
}
