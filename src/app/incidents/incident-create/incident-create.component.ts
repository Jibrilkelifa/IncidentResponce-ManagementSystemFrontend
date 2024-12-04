import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { AuthService } from 'src/app/services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-incident',
  templateUrl: './incident-create.component.html',
  styleUrls: ['./incident-create.component.scss'],
})
export class CreateIncidentComponent implements OnInit {
  incident: Incident = {
    id: 0,
    title: '',
    description: '',
    recommendedAction: '',
    status: 'Open',
    severity: '',
    assignee: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    updates: [],
    escalatedTo: [],
    escalatedBy: '',
    escalatedToEmails: [],
    escalatedToPhones: [],
    escalated: false,
    sources: [],
    affectedSystems: [] // New field for affected assets
  };

  newSource: string = ''; // For temporarily holding the entered source
  newAsset: string = ''; // For temporarily holding the entered affected asset
  loading: boolean = false;
  severityOptions = [
    { label: 'Critical', value: 'Critical' },
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
  ];

  constructor(private messageService: MessageService,private router:Router ,private incidentService: IncidentService, private authService: AuthService) {}

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

  addSource(): void {
    if (this.newSource.trim()) {
      this.incident.sources.push(this.newSource.trim());
      this.newSource = '';
    }
  }

  removeSource(index: number): void {
    this.incident.sources.splice(index, 1);
  }

  addAsset(): void {
    if (this.newAsset.trim()) {
      this.incident.affectedSystems.push(this.newAsset.trim());
      this.newAsset = '';
    }
  }

  removeAsset(index: number): void {
    this.incident.affectedSystems.splice(index, 1);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.incidentService.createIncident(this.incident).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Incident created successfully!',
            life: 3000, // Message stays visible for 3 seconds
          });          form.reset();
          this.incident.sources = [];
          this.incident.affectedSystems = [];
        },
        error: (err) => {
          console.error('Error creating incident:', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create incident.' });
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill out all required fields.' });
    }
  }
}
