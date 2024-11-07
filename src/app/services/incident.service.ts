import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident-model';
import { Update } from '../models/update';
import { SOCReport } from '../models/soc-report.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private apiUrl = 'http://localhost:8091/api/incidents';

  constructor(private http: HttpClient) { }

  getIncidentById(id: number): Observable<Incident> {
    return this.http.get<Incident>(`${this.apiUrl}/find/${id}`);
  }
  createIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(`${this.apiUrl}/create`, incident);
  }

  // Method to get all incidents
  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/list/all`);
  }
  escalateIncident(incidentId: number, escalationData: { escalatedTo: string; escalatedToEmail: string; escalatedBy: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${incidentId}/escalate`, escalationData);
  }

  // Method to get escalated incidents for the logged-in user
  getEscalatedIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/escalations`);
  }
  addUpdate(incidentId: number, update: Update): Observable<Update> {
    return this.http.post<Update>(`${this.apiUrl}/${incidentId}/updates`, update);
  }
  createSOCReport(report: SOCReport): Observable<SOCReport> {
    return this.http.post<SOCReport>(`${this.apiUrl}/report`, report);
  }
  getSOCReportId(reportDate: string, shiftType: string): Observable<number> {
    const params = { reportDate, shift: shiftType };
    return this.http.get<number>(`${this.apiUrl}/reportId`, { params });
  }
  
  downloadSOCReportPdf(reportId: number): Observable<Blob> { 
    return this.http.get(`${this.apiUrl}/download/${reportId}`, {
      responseType: 'blob' 
    });
  }

  getCountByAffectedSystem(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/count-by-affected-system`);
  }

  // Fetch escalated incidents grouped by escalatedTo
  getEscalatedIncidentsGroupedByEscalatedTo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/escalated-grouped-by-escalated-to`);
  }

  // Fetch incidents with sources that have more than one incident
  getIncidentsWithMultipleSources(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/grouped-by-source-multiple`);
  }
  
}
