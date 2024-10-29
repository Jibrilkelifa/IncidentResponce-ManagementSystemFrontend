import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident-model';
import { Update } from '../models/update';

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
  escalateIncident(id: number, escalatedTo: string): Observable<Incident> {
    return this.http.post<Incident>(`${this.apiUrl}/${id}/escalate`, escalatedTo);
  }
  addUpdate(incidentId: number, update: Update): Observable<Update> {
    return this.http.post<Update>(`${this.apiUrl}/${incidentId}/updates`, update);
  }
}
