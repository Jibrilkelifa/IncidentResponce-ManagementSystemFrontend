// forgot-password.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router : Router) {}
  requestPasswordReset() {
    this.authService.requestPasswordReset(this.email).subscribe(
      response => {
        this.message = 'A password reset link has been sent to your email. Redirecting...';
        
        // Redirect to reset password page after a delay
        setTimeout(() => {
          this.router.navigate(['/reset-password']);
        }, 3000); // Redirect after 3 seconds
      },
      error => {
        this.message = 'An error occurred. Please try again.';
      }
    );
  }
}
