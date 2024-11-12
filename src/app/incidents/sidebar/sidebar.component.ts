import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(public authService: AuthService) {}

}
