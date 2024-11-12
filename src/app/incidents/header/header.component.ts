import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private authSubscription!: Subscription;
  toggleSidebar: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  // Check if the user is logged in by checking the presence of the token in localStorage
  checkLoginStatus(): void {
    const token = this.authService.getToken(); 
    this.isLoggedIn = token ? true : false; // If token exists, user is logged in
  }

  // Logout method
  onLogout(): void {
    this.authService.logout();
  }

  // Toggle sidebar visibility
  onToggleSidebar(): void {
    this.toggleSidebar = !this.toggleSidebar;
    console.log("Sidebar toggled: ", this.toggleSidebar); // Example logging
  }
}
