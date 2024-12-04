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

  

   private apiUrl = 'http://localhost:8091/api/incidents';

  // private apiUrl2 = 'http://localhost:8091/api/soc';

  constructor(private http: HttpClient) { }

  getIncidentById(id: number): Observable<Incident> {
    return this.http.get<Incident>(`${this.apiUrl}/find/${id}`);
  }
  createIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(`${this.apiUrl}/create`, incident);
  }
  sendSOCReportEmail(reportId: number): Observable<any> {
    return this.http.post(`${this.apiUrl2}/sendReport/${reportId}`, {});
  }

  // Method to get all incidents
  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/list/all`);
  }
  searchIncidents(searchTerm: string): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/search`, { params: { searchTerm } });
}

escalateIncident(incidentId: number, escalationData: { escalatedTo: string[], escalatedToEmails: string[], escalatedToPhones: string[], escalatedBy: string }): Observable<any> {
  return this.http.put(`${this.apiUrl}/${incidentId}/escalate`, escalationData);
}

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`); 
  }
  getGroups() {
    return this.http.get<Group[]>(`${this.apiUrl2}/list`); 
  }

  // Method to get escalated incidents for the logged-in user
  getEscalatedIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/escalations`);
  }
  addUpdate(incidentId: number, update: Update): Observable<Update> {
    return this.http.post<Update>(`${this.apiUrl}/${incidentId}/updates`, update);
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
