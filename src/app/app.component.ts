import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Incident Response Management System';
  showSidebar: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Update sidebar visibility on navigation or auth changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSidebarVisibility(event.urlAfterRedirects);
      }
    });

    // Update sidebar when auth status changes
    this.authService.authStatus$.subscribe(() => {
      this.updateSidebarVisibility(this.router.url);
    });
  }

  private updateSidebarVisibility(currentRoute: string): void {
    const isAuthenticated = this.authService.isAuthenticated();
    const hideSidebarRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password'];

    // Sidebar is shown only for authenticated users and excluded routes
    this.showSidebar = isAuthenticated && !hideSidebarRoutes.some(route => currentRoute.startsWith(route));
  }
}
