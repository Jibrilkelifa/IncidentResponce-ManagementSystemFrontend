import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8091/api/auth';
    private authStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  authStatus$ = this.authStatus.asObservable();


  constructor(private http: HttpClient, private router:Router) {}

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
  // AuthService
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }
  

// resetPassword(token: string, newPassword: string): Observable<any> {
//   return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
// }
resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
  const payload = { token, newPassword, confirmPassword };
  return this.http.post(`${this.apiUrl}/reset-password`, payload, { responseType: 'text' });
}



  

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Add the logout method here
  logout(): void {
    localStorage.removeItem('token'); 
    this.authStatus.next(false);
    this.router.navigate(['/signin']); 
  }

  isAuthenticated() {
    return !!this.getToken();
  }

}
