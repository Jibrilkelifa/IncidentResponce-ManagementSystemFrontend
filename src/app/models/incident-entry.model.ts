// src/app/models/incident-entry.model.ts

export interface IncidentEntry {
    id?: number;               // Optional, will be assigned by the backend
    offenceName: string;       // Name of the offense or type of malicious activity
    rootCause: string;         // Root cause of the incident
    affectedAsset: string;     // The asset affected by the incident
    ipAddress: string;         // IP address related to the incident
    recommendedAction: string; // Suggested action or mitigation
  }
  