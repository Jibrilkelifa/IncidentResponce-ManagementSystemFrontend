import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject the AuthService
  const router = inject(Router); // Inject the Router for redirection

  // Check if the user is authenticated by validating the token
  if (authService.getToken()) {
    return authService.validateToken().pipe(
      map(isValid => {
        if (isValid) {
          return true; // Token is valid, allow access to route
        } else {
          router.navigate(['/signin']); // Redirect to signin if token is invalid
          return false;
        }
      })
    );
  } else {
    // If no token exists, redirect to signin
    router.navigate(['/signin']);
    return false;
  }
};
