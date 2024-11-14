import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8091/api/auth';
  
  // Initializes auth status based on token presence
  private authStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  signin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password })
      .pipe(map((response: any) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
          this.authStatus.next(true);  // Notify that user is now authenticated
        }
        return response;
      }));
  }

  signup(username: string, password: string, confirmPassword: string, fullName: string, jobTitle: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password, confirmPassword, fullName, jobTitle });
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/current-user`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    });
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    const payload = { token, newPassword, confirmPassword };
    return this.http.post(`${this.apiUrl}/reset-password`, payload, { responseType: 'text' });
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authStatus.next(false);  // Notify that user is now logged out
    this.router.navigate(['/signin']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
