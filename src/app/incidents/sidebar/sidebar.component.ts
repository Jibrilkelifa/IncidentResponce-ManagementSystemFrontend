import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  expandedSections = {
    socSchedule: false,
    adSchedule: false,
  };
  isTokenValid: boolean = false;  // To track if the user is authenticated

  constructor(public authService: AuthService) {}

  ngOnInit(): void {  }



  toggleSection(section: 'socSchedule' | 'adSchedule'): void {
    this.expandedSections[section] = !this.expandedSections[section]; 
  }
}
