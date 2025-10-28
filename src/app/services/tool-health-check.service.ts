import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolHealthCheckDTO } from '../models/tool-health-check.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolHealthCheckService {
  private apiUrl = 'http://localhost:8443/api/tool-health-check';

  constructor(private http: HttpClient) {}

  submitCheck(data: ToolHealthCheckDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  getSession(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
 
  }

    getAllChecks(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}`);
}
}
