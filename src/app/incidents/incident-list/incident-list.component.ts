import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  incidents: Incident[] = [];          // All incidents
  paginatedIncidents: Incident[] = [];  // Incidents for the current page
  totalRecords = 0;                    // Total records
  rows = 10;                           // Rows per page
  currentPage = 0;                     // Current page index
  totalPages: number[] = [];           // Total pages
  searchTerm: string = '';             // Search term

  constructor(private incidentService: IncidentService, private router: Router) {}

  ngOnInit(): void {
    this.getIncidents();  // Load incidents on page load
  }

  getIncidents(): void {
    this.incidentService.getIncidents().subscribe((data: Incident[]) => {
      this.incidents = data;
      this.totalRecords = this.incidents.length;
      this.calculateTotalPages();
      this.loadPage();  // Load the first page
    });
  }

  // Calculate total pages based on the total records and rows per page
  calculateTotalPages(): void {
    const totalPages = Math.ceil(this.totalRecords / this.rows);
    this.totalPages = Array(totalPages).fill(0).map((_, i) => i);
  }

  // Load incidents for the current page
  loadPage(): void {
    const start = this.currentPage * this.rows;
    const end = start + this.rows;
    this.paginatedIncidents = this.incidents.slice(start, end);
  }

  // Handle the search logic
  onSearch(): void {
    if (this.searchTerm.trim()) {
        this.incidentService.searchIncidents(this.searchTerm).subscribe((data: Incident[]) => {
            this.incidents = data;
            this.totalRecords = this.incidents.length;
            this.calculateTotalPages();
            this.loadPage();
        });
    } else {
        this.getIncidents(); // Fetch all incidents if the search term is empty
    }
}


  // Pagination - go to the previous page
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPage();
    }
  }

  // Pagination - go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages.length - 1) {
      this.currentPage++;
      this.loadPage();
    }
  }

  // Pagination - go to a specific page
  goToPage(index: number): void {
    this.currentPage = index;
    this.loadPage();
  }

  // View incident details by navigating to the incident detail page
  viewIncident(id: number): void {
    this.router.navigate(['incident', id]); // Navigate to the incident details page
  }
}
