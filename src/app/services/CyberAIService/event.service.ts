import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AlertEvent {
  id: number;
  eventId: string;
  source: string;
  rawPayload: string;
  enrichment: string;
  eventType: string;
  status: string;
  processedBy: string;
  malicious: boolean;
  probability: number;
  threatCategory: string;
  indicatorsJson: string;
  reasonsJson: string;
  featuresJson: string;
  createdAt: string;
  updatedAt: string;
}



@Injectable({ providedIn: 'root' })
export class EventService {
  private baseUrl = 'http://localhost:8098/api/v1/events';  // Adjust proxy if needed

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<AlertEvent[]> {
    return this.http.get<AlertEvent[]>(this.baseUrl);
  }

  getEventById(id: number): Observable<AlertEvent> {
    return this.http.get<AlertEvent>(`${this.baseUrl}/${id}`);
  }
}
