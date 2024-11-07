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
  loading: boolean = true;

  constructor(private incidentService: IncidentService , private router: Router) { }

  ngOnInit(): void {
    this.loadEscalatedIncidents();  }

  loadEscalatedIncidents() {
    this.incidentService.getEscalatedIncidents().subscribe(
      (incidents) => {
        this.escalatedIncidents = incidents;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching escalated incidents:', error);
        this.loading = false;
      }
    );
  }
  viewIncident(id: number): void {
    this.router.navigate(['incident', id]); 
  }
  
}
