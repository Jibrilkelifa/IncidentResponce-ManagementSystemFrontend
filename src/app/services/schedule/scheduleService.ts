import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../../models/schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private httpOptions: { headers: HttpHeaders };
  private apiServiceUrl = 'https://irsm.coopbankoromiasc.com:8443/api/schedules'; 

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }),
    };
  }

  /**
   * Fetch formatted schedules from the backend.
   * @returns Observable of a Map with schedules.
   */
  getSchedules(): Observable<Map<string, any>> {
    return this.http.get<Map<string, any>>(`${this.apiServiceUrl}/formatted`, this.httpOptions);
  }

  /**
   * Delete all schedules in the system.
   * @returns Observable for the HTTP DELETE request.
   */
  deleteAllSchedules(): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/deleteAll`, this.httpOptions);
  }

  /**
   * Generate schedules for a given time frame.
   * @param startDate Start date for schedule generation.
   * @param days Number of days to generate schedules for.
   * @param isThreeShiftScenario Boolean indicating whether to use three-shift or two-shift mode.
   * @returns Observable of the generated schedule.
   */
  generateSchedule(startDate: string, days: number, isThreeShiftScenario: boolean): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('days', days.toString())
      .set('isThreeShiftScenario', isThreeShiftScenario.toString());

    return this.http.post<any>(`${this.apiServiceUrl}/generate`, null, {
      ...this.httpOptions,
      params,
    });
  }

  /**
   * Fetch working hours of users for a given date range.
   * @param startDate Start date of the range.
   * @param endDate End date of the range.
   * @returns Observable containing user hours data.
   */
  getUserHours(startDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<any[]>(`${this.apiServiceUrl}/user-hours`, {
      ...this.httpOptions,
      params,
    });
  }
  getCurrentShift(): Observable<any> {
    return this.http.get<any>(`${this.apiServiceUrl}/current-shift`);
  }
  
  getNextShift(): Observable<any> {
    return this.http.get<any>(`${this.apiServiceUrl}/next-shift`);
  }
  
  
}
