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
  incidents: Incident[] = [];          // Full list of incidents
  paginatedIncidents: Incident[] = [];  // Display data for current page
  totalRecords: number = 0;            // Total number of records for pagination
  first: number = 0;                   // Starting index for pagination
  rows: number = 10;                   // Rows per page

  constructor(private incidentService: IncidentService, private router: Router) { }

  ngOnInit(): void {
    this.getIncidents();
  }

  getIncidents(): void {
    this.incidentService.getIncidents().subscribe((data: Incident[]) => {
      this.incidents = data;
      this.totalRecords = this.incidents.length;  // Total records for pagination
      this.paginate();  // Paginate data after fetching it
    });
  }

  paginate(): void {
    // Slice data based on 'first' and 'rows' to paginate the incidents array
    this.paginatedIncidents = this.incidents.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any): void {
    // Update the 'first' index and 'rows' as user changes pages
    this.first = event.first;
    this.rows = event.rows;
    this.paginate();  // Re-paginate based on the new page and rows
  }

  viewIncident(id: number): void {
    this.router.navigate(['incident', id]); // Navigate to the detail route with the ID
  }
}
