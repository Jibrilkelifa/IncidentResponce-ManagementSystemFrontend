import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { AuthService } from 'src/app/services/AuthService'; // Import AuthService
import { Update } from '../../models/update';

@Component({
  selector: 'app-incident-detail',
  templateUrl: 'incident-detail.component.html',
  styleUrls: ['incident-detail.component.css'],
})
export class IncidentDetailComponent implements OnInit {
  incident: Incident = {
    id: 0,
    status: '',
    escalatedTo: [],
    escalatedBy: '',
    escalationMessage: '',
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
    updates: [],
    category: '',
subcategory: ''

  };

  loggedInUser: string = ''; // Store logged-in user's name
  canEditIncident: boolean = false; // Determine if the user can escalate or update
  statusOptions = [{ label: 'Resolved', value: 'Resolved' }];

  newUpdate: Update = { message: '', newStatus: '' };
  incidentId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private incidentService: IncidentService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.incidentId = +this.route.snapshot.paramMap.get('id')!;
    this.getIncidentDetails();
    this.getLoggedInUser();
  }

  getIncidentDetails(): void {
    if (this.incidentId) {
      this.incidentService.getIncidentById(this.incidentId).subscribe(
        (response: Incident) => {
          this.incident = response;
          this.checkUserPermission(); // Check if user can edit or escalate
        },
        (error) => {
          console.error('Error fetching incident details', error);
        }
      );
    }
  }

  getLoggedInUser(): void {
    this.authService.getCurrentUser().subscribe(
      (user) => {
        this.loggedInUser = user.fullName; // Fetch logged-in user's full name
        this.checkUserPermission(); // Ensure permissions are updated after fetching user
      },
      (error) => {
        console.error('Error fetching logged-in user:', error);
      }
    );
  }

  checkUserPermission(): void {
    if (this.incident && this.loggedInUser) {
      this.canEditIncident = this.incident.assignee === this.loggedInUser;
    }
  }

  escalateIncident(): void {
    if (this.incidentId) {
      this.router.navigate(['/incident', this.incidentId, 'escalate']);
    } else {
      console.error('Incident ID is undefined');
    }
  }

  updateIncident(): void {
    if (this.incidentId) {
      this.router.navigate(['/create'], { queryParams: { id: this.incidentId } });
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
        this.newUpdate = { message: '', newStatus: '' };
        console.log('Update added successfully');
      },
      (error) => {
        console.error('Error adding update', error);
      }
    );
  }
}
