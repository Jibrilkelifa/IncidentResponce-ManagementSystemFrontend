import { Component } from '@angular/core';
import { ShiftHandoverService } from '../../services/ShiftHandoverService';
import { MessageService } from 'primeng/api';
import { ShiftHandover } from 'src/app/models/shift-handover.model';

@Component({
  selector: 'app-shift-handover',
  templateUrl: './shift-handover.component.html',
  styleUrls: ['./shift-handover.component.scss'],
})
export class ShiftHandoverComponent {
  handover: ShiftHandover = {
    analystName: '',
    shiftType: '',
    shiftStart: '',
    shiftEnd: '',
    summaryOfActivities: '',
    pendingTasks: '',
    lessonsLearned: '',
    handedOverTo: '',
    attachments: [],
  };

  constructor(
    private handoverService: ShiftHandoverService,
    private messageService: MessageService
  ) {}

  onFileSelected(event: any): void {
    this.handover.attachments = Array.from(event.target.files);
  }

  validateSummary(): boolean {
    return this.handover.summaryOfActivities.trim().length >= 300;
  }

  submit(): void {
    if (!this.validateSummary()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Summary of Shift Activities must be at least 300 characters long.',
      });
      return;
    }

    this.handoverService.submitHandover(this.handover).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Submitted',
          detail: 'Shift handover submitted successfully.',
        });
        this.resetForm();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Submission Failed',
          detail: 'Please try again later.',
        });
        console.error('Error:', err);
      },
    });
  }

  resetForm(): void {
    this.handover = {
      analystName: '',
      shiftType: '',
      shiftStart: '',
      shiftEnd: '',
      summaryOfActivities: '',
      pendingTasks: '',
      lessonsLearned: '',
      handedOverTo: '',
      attachments: [],
    };
  }
}
