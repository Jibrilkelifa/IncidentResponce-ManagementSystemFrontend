import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident-model';
import { Update } from '../models/update';
import { SOCReport } from '../models/soc-report.model';
import { User } from '../models/user';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private apiUrl = 'https://irsm.coopbankoromiasc.com:8443/api/incidents';
  private apiUrl2 = 'https://irsm.coopbankoromiasc.com:8443/api/groups';
  //   private apiUrl2 = 'http://localhost:8443/api/groups';
  // private apiUrl = 'http://localhost:8443/api/incidents';


  constructor(private http: HttpClient) {}

  getIncidentById(id: number): Observable<Incident> {
    return this.http.get<Incident>(`${this.apiUrl}/find/${id}`);
  }

  createIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(`${this.apiUrl}/create`, incident);
  }
  getTodaysIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/today`);
  }

  // Fetch incidents for this week
  getThisWeeksIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/week`);
  }
  updateIncident(id: number, updatedFields: Partial<Incident>): Observable<Incident> {
    return this.http.put<Incident>(`${this.apiUrl}/update/${id}`, updatedFields);
  }
  

  // Fetch incidents for this month
  getThisMonthsIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/month`);
  }

  sendSOCReportEmail(reportId: number): Observable<any> {
    return this.http.post(`${this.apiUrl2}/sendReport/${reportId}`, {});
  }

  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/list/all`);
  }
  getIncidentSummary(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/metrics/summary`);
}


  searchIncidents(searchTerm: string): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/search`, { params: { searchTerm } });
  }

  escalateIncident(
    incidentId: number,
    escalationData: { escalatedTo: string[]; escalatedToEmails: string[]; escalatedToPhones: string[]; escalatedBy: string }
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${incidentId}/escalate`, escalationData);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl2}/list`);
  }

  getEscalatedIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/escalations`);
  }

  addUpdate(incidentId: number, update: Update): Observable<Update> {
    return this.http.post<Update>(`${this.apiUrl}/${incidentId}/updates`, update);
  }

  getExportedIncidents(from: string, to: string): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/export`, {
    params: { from, to },
    responseType: 'blob'  // Important: we expect a binary file
  });
}


  createSOCReport(report: SOCReport): Observable<SOCReport> {
    return this.http.post<SOCReport>(`${this.apiUrl2}/report`, report);
  }

  getSOCReportId(reportDate: string, shiftType: string): Observable<number> {
    const params = { reportDate, shift: shiftType };
    return this.http.get<number>(`${this.apiUrl2}/reportId`, { params });
  }

  downloadSOCReportPdf(reportId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl2}/download/${reportId}`, {
      responseType: 'blob',
    });
  }

  getCountByAffectedSystem(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/count-by-affected-system`);
  }

  getEscalatedIncidentsGroupedByEscalatedTo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/escalated-grouped-by-escalated-to`);
  }

  getIncidentsWithMultipleSources(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/grouped-by-source-multiple`);
  }

  getIncidentTrend(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/metrics/trends`);
  }
  
}
