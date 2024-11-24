import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escalation-list',
  templateUrl: './escalation-list.component.html',
  styleUrls: ['./escalation-list.component.css']
})
export class EscalationListComponent implements OnInit {
  escalatedIncidents: Incident[] = [];
  paginatedEscalatedIncidents: Incident[] = [];
  loading: boolean = true;
  totalRecords: number = 0;
  first: number = 0;
  rows: number = 10;
  totalPages: number[] = [];
  currentPage: number = 0;
  searchTerm: string = '';

  constructor(private incidentService: IncidentService, private router: Router) { }

  ngOnInit(): void {
    this.loadEscalatedIncidents();
  }

  loadEscalatedIncidents() {
    this.incidentService.getEscalatedIncidents().subscribe(
      (incidents) => {
        this.escalatedIncidents = incidents;
        this.totalRecords = this.escalatedIncidents.length;
        this.calculateTotalPages();
        this.paginate();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching escalated incidents:', error);
        this.loading = false;
      }
    );
  }

  // Calculate total pages based on the total records and rows per page
  calculateTotalPages() {
    const totalPages = Math.ceil(this.totalRecords / this.rows);
    this.totalPages = totalPages > 1 ? Array(totalPages).fill(0).map((_, i) => i) : [0];
  }

  // Filtered incidents based on search term
  onSearch(): void {
    if (this.searchTerm.trim()) {
        this.incidentService.searchIncidents(this.searchTerm).subscribe((data: Incident[]) => {
            this.escalatedIncidents = data;
            this.totalRecords = this.escalatedIncidents.length;
            this.calculateTotalPages();
            this.loadPage();
        });
    } else {
        this.loadEscalatedIncidents; // Fetch all incidents if the search term is empty
    }
}
loadPage(): void {
  const start = this.currentPage * this.rows;
  const end = start + this.rows;
  this.paginatedEscalatedIncidents= this.escalatedIncidents.slice(start, end);
}

  paginate() {
    const start = this.currentPage * this.rows;
    const end = start + this.rows;
    this.paginatedEscalatedIncidents = this.escalatedIncidents.slice(start, end);
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages.length - 1) {
      this.currentPage++;
      this.paginate();
    }
  }

  goToPage(index: number) {
    this.currentPage = index;
    this.paginate();
  }

  viewIncident(id: number) {
    this.router.navigate(['incident', id]);
  }
}
