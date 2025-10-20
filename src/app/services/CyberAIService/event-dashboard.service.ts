import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventDashboardService {

  private baseUrl = 'http://localhost:8098/api/dashboard'; // your CoreHub API base

  constructor(private http: HttpClient) {}
 getDashboardSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/summary`);
  }

  getRecentEvents(limit: number = 5): Observable<any> {
    return this.http.get(`${this.baseUrl}/recent?limit=${limit}`);
  }

  getDashboardStats(): Observable<any> {
    return forkJoin({
      summary: this.getDashboardSummary(),
      recentEvents: this.getRecentEvents()
    });
  } 

}