import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { Update } from '../../models/update';

@Component({
  selector: 'app-incident-detail',
  templateUrl: 'incident-detail.component.html',
  styleUrls: ['incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {
  incident: Incident = {
    id: 0,
    status: '',
    escalatedTo: '',
    escalatedBy: '',
    escalated: false,
    severity: '',
    title: '',
    assignee: '',
    affectedSystem: '',
    location: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    description: '',
    updates: []
  };
  newUpdate: Update = { message: '', newStatus: '' };
  incidentId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private incidentService: IncidentService
  ) {}

  ngOnInit(): void {
    this.incidentId = +this.route.snapshot.paramMap.get('id')!;
    this.getIncidentDetails();
  }

  getIncidentDetails(): void {
    if (this.incidentId) {
      this.incidentService.getIncidentById(this.incidentId).subscribe(
        (response: Incident) => {
          this.incident = response;
        },
        error => {
          console.error('Error fetching incident details', error);
        }
      );
    }
  }

  escalateIncident() {
    // Ensure incidentId is defined before navigating
    if (this.incidentId) {
      this.router.navigate(['/incident', this.incidentId, 'escalate']);
    } else {
      console.error('Incident ID is undefined');
    }
  }

  onSubmit(): void {
    const incidentId = this.incident.id;
    this.incidentService.addUpdate(incidentId, this.newUpdate).subscribe(
      (update: Update) => {
        update.timestamp = new Date();
        if (!this.incident.updates) {
          this.incident.updates = [];
        }
        this.incident.updates.push(update);
        this.newUpdate = { message: '', newStatus: '' }; // Reset form
      },
      error => {
        console.error('Error adding update', error);
      }
    );
  }
}
