import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './AuthService';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      // Check if the token is expired
      const isTokenExpired = this.isTokenExpired(token);
      if (isTokenExpired) {
        this.authService.logout(); // Clear stored token and user data
        this.router.navigate(['/login']); // Redirect to login page
        return throwError(() => new Error('Token expired. Please log in again.'));
      }

      // Attach the token to the request
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Handle 401 errors (e.g., invalid or expired token)
            this.authService.logout();
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
    }

    // Proceed with the request if there's no token
    return next.handle(req);
  }

  private isTokenExpired(token: string): boolean {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTime; // Compare expiry time with current time
  }
}
