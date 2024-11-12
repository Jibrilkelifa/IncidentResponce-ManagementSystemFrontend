import { Component } from '@angular/core';
import { AuthService } from '../../../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  signin(): void {
    this.authService.signin(this.username, this.password).subscribe(
      response => {
        this.router.navigate(['/dashboard']);
      },
      error => {
        if (error.status === 403) {
          this.errorMessage = 'Invalid login credentials';
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      }
    );
  }
  
  
}
