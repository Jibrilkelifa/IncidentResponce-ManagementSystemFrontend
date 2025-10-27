export interface ShiftHandover {
  analystName: string;
  shiftType: string;
  shiftStart: string; // ISO date-time string
  shiftEnd: string;   // ISO date-time string
  pendingTasks?: string;
  lessonsLearned?: string;
  summaryOfActivities: string;
  handedOverTo?: string;
  attachments?: File[];
}
