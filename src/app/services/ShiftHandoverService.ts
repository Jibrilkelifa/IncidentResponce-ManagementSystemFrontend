import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShiftHandover } from '../models/shift-handover.model';

@Injectable({
  providedIn: 'root',
})
export class ShiftHandoverService {
  private apiUrl = 'http://localhost:8443/api/handovers';

  constructor(private http: HttpClient) {}

  submitHandover(data: ShiftHandover): Observable<any> {
    const formData = new FormData();
    formData.append('analystName', data.analystName);
    formData.append('shiftType', data.shiftType);
    formData.append('shiftStart', data.shiftStart);
    formData.append('shiftEnd', data.shiftEnd);
    formData.append('summaryOfActivities', data.summaryOfActivities);
    if (data.pendingTasks) formData.append('pendingTasks', data.pendingTasks);
    if (data.lessonsLearned) formData.append('lessonsLearned', data.lessonsLearned);
    if (data.handedOverTo) formData.append('handedOverTo', data.handedOverTo);
    if (data.attachments && data.attachments.length > 0) {
      data.attachments.forEach(file => formData.append('attachments', file));
    }

    return this.http.post(this.apiUrl, formData);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


}
