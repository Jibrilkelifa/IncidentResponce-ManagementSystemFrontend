import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  toggleSidebar: boolean = false; // Add this property

  // Define the method to toggle sidebar visibility
  onToggleSidebar(): void {
    this.toggleSidebar = !this.toggleSidebar;
    // Add logic here to communicate with the sidebar component if necessary
    console.log("Sidebar toggled: ", this.toggleSidebar); // Example logging
  }
}
