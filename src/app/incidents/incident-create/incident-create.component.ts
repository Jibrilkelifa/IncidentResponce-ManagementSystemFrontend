import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { AuthService } from 'src/app/services/AuthService';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-create-incident',
  templateUrl: 'incident-create.component.html',
  styleUrls: ['incident-create.component.scss'],
})
export class CreateIncidentComponent implements OnInit {
  users: User[] = [];
  incident: Incident = {
    id: 0, // Add a default value; it can be updated later if necessary
    title: '', // Initialize title property
    description: '',
    status: 'Open', // Default status initialized to 'Open'
    severity: '', // Initialize severity property
    assignee: '', // Initialize assignee property
    affectedSystem: '', // Initialize affectedSystem property
    location: '', // Initialize location property
    createdAt: new Date(),
    updatedAt: new Date(),
    updates: [],
    escalatedTo:'',
    escalatedBy:'',
    escalatedToEmail: '',
    escalated: false // Initialize updates as an empty array
  };

  loading: boolean = false; // Declare the loading property
  severityOptions = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
  ];

  constructor(private messageService: MessageService, private incidentService: IncidentService, private authService:AuthService) {}

  ngOnInit(): void {
    this.populateLoggedInUser();
  }
  populateLoggedInUser() {
    this.authService.getCurrentUser().subscribe(
      (user) => {
        this.incident.assignee = user.fullName;
      },
      (error) => {
        console.error('Error fetching logged-in user:', error);
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true; // Set loading to true when submitting
      this.incidentService.createIncident(this.incident).subscribe({
        next: (response) => {
          console.log('Incident submitted:', response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Incident created successfully!' });
          form.reset(); // Reset the form if needed
        },
        error: (err) => {
          console.error('Error creating incident:', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create incident.' });
        },
        complete: () => {
          this.loading = false; // Set loading to false after submission
        },
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill out all required fields.' });
    }
  }
}
