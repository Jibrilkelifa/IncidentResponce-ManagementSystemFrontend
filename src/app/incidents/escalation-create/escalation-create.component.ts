// src/app/components/escalation-form/escalation-form.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentService } from '../../services/incident.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-escalation-form',
  templateUrl: './escalation-form.component.html',
  styleUrls: ['./escalation-form.component.scss'],
  providers: [MessageService]
})
export class EscalationFormComponent implements OnInit {
  incidentId!: number;

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
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Get incidentId from route parameters
    this.incidentId = +this.route.snapshot.paramMap.get('id')!;
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
