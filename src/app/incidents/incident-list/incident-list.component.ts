import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-incident-list',
  templateUrl: 'incident-list.component.html',
  styleUrls: ['incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  incidents: Incident[] = [];  

  constructor(private incidentService: IncidentService , private router: Router) { }

  ngOnInit(): void {
    this.getIncidents();
  }

  getIncidents() {
    this.incidentService.getIncidents().subscribe((data: Incident[]) => {
      this.incidents = data;
      console.log(this.incidents);  // Log the data to the console
    });
  }
  viewIncident(id: number): void {
    this.router.navigate(['incident', id]); // Navigate to the detail route with the ID
  }
  
}
