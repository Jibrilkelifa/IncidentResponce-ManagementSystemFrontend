import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Alert } from "../models/grafanaAlert";
import { Observable, throwError } from 'rxjs'; 
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class GrafanaAlertService {
  private apiUrl = 'https://irsm.coopbankoromiasc.com:8443/alerts/list'; 
  private saveUrl = 'https://irsm.coopbankoromiasc.com:8443/alerts/save'; 

  
  constructor(private http: HttpClient) {}

  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching alerts:', error);
        return throwError(() => new Error('Failed to fetch alerts')); // ✅ Fix throwError
      })
    );
  }
  fetchAndSaveAlerts(): Observable<any> {
    return this.http.get(this.saveUrl, {}).pipe(
      catchError((error) => {
        console.error('Error fetching and saving alerts:', error);
        return throwError(() => new Error('Failed to fetch and save alerts'));
      })
    );
  }
  
}