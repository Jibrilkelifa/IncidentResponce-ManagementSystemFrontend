import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escalation-list',
  templateUrl: 'escalation-list.component.html',
  styleUrls: ['escalation-list.component.css']
})
export class EscalationListComponent implements OnInit {
  escalatedIncidents: Incident[] = [];
  paginatedEscalatedIncidents: Incident[] = [];
  loading: boolean = true;
  totalRecords: number = 0;
  first: number = 0;
  rows: number = 10;

  constructor(private incidentService: IncidentService , private router: Router) { }

  ngOnInit(): void {
    this.loadEscalatedIncidents();
  }

  loadEscalatedIncidents() {
    this.incidentService.getEscalatedIncidents().subscribe(
      (incidents) => {
        this.escalatedIncidents = incidents;
        this.totalRecords = this.escalatedIncidents.length;
        this.paginate();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching escalated incidents:', error);
        this.loading = false;
      }
    );
  }

  paginate() {
    this.paginatedEscalatedIncidents = this.escalatedIncidents.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.paginate();
  }

  viewIncident(id: number): void {
    this.router.navigate(['incident', id]); 
  }
}
