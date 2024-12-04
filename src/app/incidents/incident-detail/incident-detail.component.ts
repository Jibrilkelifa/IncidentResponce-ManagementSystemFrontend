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
    escalatedTo: [],
    escalatedBy: '',
    escalated: false,
    severity: '',
    title: '',
    assignee: '',
    affectedSystems: [],
    recommendedAction: '',
    sources: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    description: '',
    updates: []
  };

  statusOptions = [
    { label: 'Resolved', value: 'Resolved' }
  ];

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

  // Validate the status transition before allowing the user to submit
  isValidStatusTransition(newStatus: string): boolean {
    const currentStatus = this.incident.status;
    if (newStatus === 'Resolved' && currentStatus !== 'Open') {
      alert("Incident must be 'Open' to be marked as 'Resolved'.");
      return false;
    }
    if (newStatus === 'Closed' && currentStatus !== 'Resolved') {
      alert("Incident must be 'Resolved' to be marked as 'Closed'.");
      return false;
    }
    return true;
  }

  onSubmit(): void {
    
    const incidentId = this.incident.id; // Get the incident ID
    this.incidentService.addUpdate(incidentId, this.newUpdate).subscribe(
      (update: Update) => {
        // Add a timestamp to the new update
        update.timestamp = new Date();
        
        // Initialize updates array if it doesn't exist, then push the new update
        if (!this.incident.updates) {
          this.incident.updates = [];
        }
        this.incident.updates.push(update);
  
        // Reset the form fields after successful submission
        this.newUpdate = { message: '', newStatus: '' };
        
        // Optionally, you could show a success message here
        console.log('Update added successfully');
      },
      error => {
        console.error('Error adding update', error);
        // Optionally, show an error message or handle the error UI
      }
    );
  }
}
