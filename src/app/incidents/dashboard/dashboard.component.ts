import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalIncidents: number = 0;
  openIncidents: number = 0;
  closedIncidents: number = 0;

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.getIncidentStats();
  }

  getIncidentStats() {
    this.incidentService.getIncidents().subscribe((incidents) => {
      this.totalIncidents = incidents.length;
      this.openIncidents = incidents.filter(incident => incident.status === 'Open').length;
      this.closedIncidents = incidents.filter(incident => incident.status === 'Closed').length;
    });
  }
}
