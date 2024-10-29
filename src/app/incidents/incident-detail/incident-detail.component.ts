import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { Update } from '../../models/update'; 

@Component({
  selector: 'app-incident-detail',
  templateUrl: 'incident-detail.component.html',
  styleUrls: ['incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {
  incident: Incident; // Now incident is not undefined
  newUpdate: Update = { message: '', newStatus: '' };

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService
  ) {
    // Initialize incident with default properties or just leave it as undefined if you're fetching it later
    this.incident = { id: 0, status: '',escalatedTo:'',escalatedBy:'', escalated:false, severity: '',title:'', assignee: '', affectedSystem: '', location: '', createdAt: new Date(), updatedAt: new Date(), description: '', updates: [] }; 
  }
  ;
  ngOnInit(): void {
    this.getIncidentDetails();
  }

  getIncidentDetails(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      const incidentId = Number(id);
      this.incidentService.getIncidentById(incidentId).subscribe(
        (response: Incident) => {
          this.incident = response; // Set the selected incident
        },
        error => {
          console.error('Error fetching incident details', error);
        }
      );
    }
  }

  onSubmit(): void {
    const incidentId = this.incident.id; // Now guaranteed to be defined
    this.incidentService.addUpdate(incidentId, this.newUpdate).subscribe(
      (update: Update) => {
        if (!this.incident.updates) {
          this.incident.updates = [];
        }
        update.timestamp = new Date();
        this.incident.updates.push(update);
        this.newUpdate = { message: '', newStatus: '' }; // Reset form
      },
      error => {
        console.error('Error adding update', error);
      }
    );
  }
   escalateIncident() {
    if (this.incident) {
      const escalatedTo = 'Analyst and Manager'; // Update this as necessary based on your logic
      this.incidentService.escalateIncident(this.incident.id, escalatedTo).subscribe(
        (updatedIncident) => {
          this.incident = updatedIncident; // Update the local incident state
          // this.notificationService.showSuccess('Incident escalated successfully!'); // Optional success notification
        },
        (error) => {
          console.error('Error escalating incident:', error);
          // this.notificationService.showError('Failed to escalate the incident.'); // Optional error notification
        }
      );
    }
  }
}
