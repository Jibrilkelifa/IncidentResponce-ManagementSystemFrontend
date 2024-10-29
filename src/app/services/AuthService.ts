import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8091/api/auth';


  constructor(private http: HttpClient) {}

  signin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password })
      .pipe(map((response: any) => {
        // Save JWT token from the response
        const token = response.token;  // Ensure you are accessing 'token' key
        localStorage.setItem('token', token);
        return response;
      }));
  }
  

  signup(username: string, password: string, confirmPassword: string, fullName: string, jobTitle: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password, confirmPassword, fullName, jobTitle });
  }
  

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
