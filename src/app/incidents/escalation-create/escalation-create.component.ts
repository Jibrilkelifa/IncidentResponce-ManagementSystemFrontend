// src/app/components/escalation-form/escalation-form.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentService } from '../../services/incident.service';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-escalation-form',
  templateUrl: './escalation-form.component.html',
  styleUrls: ['./escalation-form.component.scss'],
  providers: [MessageService]
})
export class EscalationFormComponent implements OnInit {
  incidentId!: number;
  users: User[] = [];
  selectedUser!: User;

  // Only fields required for escalation
  escalationData = {
    escalatedTo: '',
    escalatedToEmail: '',
    escalatedToPhoneNumber: '',
    escalatedBy: ''
  };

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService,
    private messageService: MessageService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    // Get incidentId from route parameters
    this.incidentId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUsers();
    this.populateLoggedInUser();
  }
  loadUsers() {
    this.incidentService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }


  populateLoggedInUser() {
    this.authService.getCurrentUser().subscribe(
      (user) => {
        this.escalationData.escalatedBy = user.fullName;
      },
      (error) => {
        console.error('Error fetching logged-in user:', error);
      }
    );
  }
  
  onUserSelect(event: any) {
    const userId = +event.target.value; // Convert selected value to number
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.escalationData.escalatedTo = user.fullName;
      this.escalationData.escalatedToEmail = user.username; // Assuming username represents email
      this.escalationData.escalatedToPhoneNumber = user.phoneNumber;
    }
  }
  

  escalateIncident() {
    this.loading = true;
    this.incidentService.escalateIncident(this.incidentId, this.escalationData).subscribe(
      () => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Escalated', detail: 'Incident escalated successfully!' });
      },
      (error) => {
        this.loading = false;
        console.error('Error escalating incident:', error);
        this.messageService.add({ severity: 'error', summary: 'Escalation Failed', detail: 'Failed to escalate incident.' });
      }
    );
  }
}
