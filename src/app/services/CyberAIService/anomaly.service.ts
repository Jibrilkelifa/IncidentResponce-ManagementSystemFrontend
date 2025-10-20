import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnomalyService {
  private baseUrl = '/api/anomalies';

  constructor(private http: HttpClient) {}

  getAnomalyById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
