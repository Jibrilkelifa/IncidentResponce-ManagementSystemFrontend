import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PhishingService {
  private baseUrl = '/api/phishing';

  constructor(private http: HttpClient) {}

  getPhishingEventById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  sendFeedback(id: string, feedbackType: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/feedback`, { id, feedbackType });
  }
}
