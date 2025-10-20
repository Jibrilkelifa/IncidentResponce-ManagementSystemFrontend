import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userr } from '../../models/userr';

@Injectable({
  providedIn: 'root',
})
export class AnalystService {
  private httpOptions: { headers: HttpHeaders };
  private apiServiceUrl = 'https://irsm.coopbankoromiasc.com:8443/api/users'; // Update this base URL if necessary.

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }),
    };
  }

  /**
   * Fetch all users from the backend.
   * @returns Observable of the list of Userr.
   */
  getAllUsers(): Observable<Userr[]> {
    return this.http.get<Userr[]>(`${this.apiServiceUrl}/all`, this.httpOptions);
  }

  /**
   * Create a new user in the backend.
   * @param user Userr object containing user data.
   * @returns Observable for the HTTP POST request.
   */
  createUser(user: Userr): Observable<Userr> {
    return this.http.post<Userr>(this.apiServiceUrl, user, this.httpOptions);
  }
}
