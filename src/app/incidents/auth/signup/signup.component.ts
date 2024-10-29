import { Component } from '@angular/core';
import { AuthService } from '../../../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  username: string = '';
  fullName: string = '';         
  jobTitle: string = '';         
  password: string = '';
  confirmPassword: string = '';  
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match!";
      return;
    }
  
    this.authService.signup(this.username, this.password, this.confirmPassword, this.fullName, this.jobTitle).subscribe(
      response => {
        this.router.navigate(['/signin']);
      },
      error => {
        if (error.status === 409) {
          this.errorMessage = 'Username already exists';
        } else if (error.status === 400) {
          this.errorMessage = error.error.message || 'Validation error occurred';
        } else {
          this.errorMessage = 'Signup failed. Please try again.';
        }
      }
    );
  }
  
  
}
