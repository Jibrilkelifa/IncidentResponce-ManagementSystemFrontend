import { Component } from '@angular/core';
import { AuthService } from './services/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Incident Response Management System';
  visibleSidebar: boolean = false;
}
