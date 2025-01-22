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
  selectedUsers: User[] = []; // Multi-select users

  escalationData = {
    escalatedTo: [] as string[], // Names of selected users
    escalatedToEmails: [] as string[], // Emails of selected users
    escalatedToPhones: [] as string[], // Phone numbers of selected users
    escalatedBy: '',
    escalationMessage:'',
  };

  loading: boolean = false;
  isDropdownOpen: boolean = false; // To toggle dropdown visibility

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.incidentId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUsers();
    this.populateLoggedInUser();
  }

  loadUsers(): void {
    this.incidentService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  populateLoggedInUser(): void {
    this.authService.getCurrentUser().subscribe(
      (user) => {
        this.escalationData.escalatedBy = user.fullName;
      },
      (error) => {
        console.error('Error fetching logged-in user:', error);
      }
    );
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleUserSelection(user: User): void {
    const index = this.selectedUsers.indexOf(user);
    if (index > -1) {
      // User is already selected, remove them
      this.selectedUsers.splice(index, 1);
    } else {
      // User is not selected, add them
      this.selectedUsers.push(user);
    }

    this.updateEscalationData();
  }

  isSelected(user: User): boolean {
    return this.selectedUsers.includes(user);
  }

  updateEscalationData(): void {
    // Clear previous selections
    this.escalationData.escalatedTo = [];
    this.escalationData.escalatedToEmails = [];
    this.escalationData.escalatedToPhones = [];

    // Populate escalation details for each selected user
    this.selectedUsers.forEach((user) => {
      this.escalationData.escalatedTo.push(user.fullName);
      this.escalationData.escalatedToEmails.push(user.username);
      this.escalationData.escalatedToPhones.push(user.phoneNumber);
    });
  }

  getSelectedUserNames(): string {
    if (this.selectedUsers.length === 0) {
      return 'Select Users';
    }
    return this.selectedUsers.map((user) => user.fullName).join(', ');
  }
  isFormValid(): boolean {
    return (
      this.selectedUsers.length > 0 && // At least one user is selected
      this.escalationData.escalatedBy.trim() !== '' && // Escalated By is not empty
      this.escalationData.escalationMessage.trim() !== '' // Escalation Message is not empty
    );
  }
  

  escalateIncident(): void {
    this.loading = true;
    this.incidentService.escalateIncident(this.incidentId, this.escalationData).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Incident escalated successfully!' });
      },
      error: (err) => {
        console.error('Error escalating incident:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to escalate incident.' });
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
