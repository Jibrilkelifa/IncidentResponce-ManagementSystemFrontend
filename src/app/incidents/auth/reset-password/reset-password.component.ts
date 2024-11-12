// reset-password.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/AuthService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParams['token'];
  }

  // resetPassword() {
  //   if (this.newPassword !== this.confirmPassword) {
  //     this.message = "Passwords do not match!";
  //     return;
  //   }

  //   this.authService.resetPassword(this.token, this.newPassword).subscribe(
  //     response => {
  //       this.message = 'Password has been reset successfully.';
  //       setTimeout(() => this.router.navigate(['/signin']), 3000);
  //     },
  //     error => {
  //       this.message = 'Failed to reset password. Please try again.';
  //     }
  //   );
  // }
  resetPassword() {
    console.log('Attempting to reset password');
    if (this.newPassword !== this.confirmPassword) {
      this.message = "Passwords do not match!";
      console.log("Passwords do not match!");
      return;
    }
    
    this.authService.resetPassword(this.token, this.newPassword, this.confirmPassword).subscribe(
      response => {
        console.log('Password reset successful:', response);
        this.message = 'Your password has been successfully reset.';
        setTimeout(() => this.router.navigate(['/signin']), 3000);
      },
      error => {
        console.error('Error resetting password:', error);
        this.message = 'An error occurred. Please check your token or try again.';
      }
    );
  }
  
  
}
