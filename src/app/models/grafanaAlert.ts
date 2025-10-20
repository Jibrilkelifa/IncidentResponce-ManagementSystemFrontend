export interface Alert {
    id: number;
    alertName: string;
    state: string;
    host?: string; 
    grafanaFolder: string;
    activeAt: string;
    source?: string; 
  }
   