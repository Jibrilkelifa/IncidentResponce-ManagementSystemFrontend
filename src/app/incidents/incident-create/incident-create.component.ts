import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { AuthService } from 'src/app/services/AuthService';

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
    escalationMessage: '',
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
    affectedSystems: [],
    category: '',
    subcategory: ''

  };
showSubcategory: boolean = false;
  newSource: string = '';
  newAsset: string = '';
  loading: boolean = false;
  customSubcategory: string = '';
  showCustomSubcategory: boolean = false;

  categoryMap: { [key: string]: string[] } = {
  'Phishing': ['Other'],
  'Malware': ['Botnet Incidents', 'Crypto Mining', 'Keylogger Attacks', 'Ransomware', 'Other'],
  'Unauthorized Access': ['Other'],
  'Network Attack': [
    'DDoS (Distributed DoS)', 'Man-in-the-Middle (MITM)', 'ARP Spoofing / Poisoning',
    'DNS Spoofing / Poisoning', 'Port Scanning / Network Reconnaissance', 'Other'
  ],
  'Web Application Attack': [
    'SQL Injection (SQLi)', 'Cross-Site Scripting (XSS)', 'Cross-Site Request Forgery (CSRF)',
    'Command Injection', 'Directory Traversal', 'Session Hijacking',
    'Server-Side (Client-Side) Request Forgery (SSRF)', 'Path Traversal'
  ]
};


  severityOptions = [
    { label: 'Critical', value: 'Critical' },
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];

  constructor(
    private route: ActivatedRoute, // Ensure ActivatedRoute is injected
    private router: Router,
    private incidentService: IncidentService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      const incidentId = params['id'];
      if (incidentId) {
        this.loadIncidentDetails(incidentId);
      } else {
        this.populateLoggedInUser();
      }
    });
  }

  loadIncidentDetails(id: number): void {
    this.incidentService.getIncidentById(id).subscribe(
      (incident) => {
        this.incident = incident;
      },
      (error) => {
        console.error('Error loading incident details:', error);
      }
    );
  }

  getCategories(): string[] {
  return Object.keys(this.categoryMap);
}
onSubcategoryChange(): void {
  this.showCustomSubcategory = this.incident.subcategory === 'Other';
}

onCategoryChange(): void {
  this.showSubcategory = !!this.incident.category;
  this.incident.subcategory = '';
  this.customSubcategory = '';
  this.showCustomSubcategory = false;
}

getSubcategories(): string[] {
  return this.categoryMap[this.incident.category] || [];
}

  populateLoggedInUser(): void {
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

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.loading = true;
  // this.incident.title = `${this.incident.category}:${this.incident.subcategory}`;
if (this.incident.subcategory === 'Other' && this.customSubcategory.trim()) {
  this.incident.subcategory = this.customSubcategory.trim();
}

      if (this.incident.id) {
        // Update incident logic
        const updatableFields = {
          title: this.incident.title,
          description: this.incident.description,
          recommendedAction: this.incident.recommendedAction,
          sources: this.incident.sources,
          severity: this.incident.severity,
          affectedSystems: this.incident.affectedSystems,
        };
  
        this.incidentService.updateIncident(this.incident.id, updatableFields).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Incident updated successfully!',
            });
            this.router.navigate(['/incidents']); // Navigate to the incident list
          },
          error: (err) => {
            console.error('Error updating incident:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update incident.',
            });
          },
          complete: () => (this.loading = false),
        });
      } else {
        // Create incident logic
        this.incidentService.createIncident(this.incident).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Incident created successfully!',
            });
            form.reset();
            this.incident.sources = [];
            this.incident.affectedSystems = [];
            window.location.reload(); // Reload the page after successful creation
          },
          error: (err) => {
            console.error('Error creating incident:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to create incident.',
            });
          },
          complete: () => (this.loading = false),
        });
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill out all required fields.',
      });
    }
  }
  
}
