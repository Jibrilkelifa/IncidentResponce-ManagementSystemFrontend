import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggleSidebar: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.setUserName(); 
  }
 
  setUserName(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.userName = user.fullName;  
    });
  }


  onToggleSidebar(): void {
    this.toggleSidebar = !this.toggleSidebar;
    console.log("Sidebar toggled: ", this.toggleSidebar); 
  }
}
