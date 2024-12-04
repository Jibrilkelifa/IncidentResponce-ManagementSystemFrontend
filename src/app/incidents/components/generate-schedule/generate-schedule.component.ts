import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ScheduleService } from '../../../services/schedule/scheduleService';

@Component({
  selector: 'app-generate-schedule',
  templateUrl: './generate-schedule.component.html',
  styleUrls: ['./generate-schedule.component.scss'],
})
export class GenerateScheduleComponent implements OnInit {
  startDate: Date | string = '';  // Initialize as an empty string or any default value

  days: number = 1;
  msgs: any[] = [];
  loading: boolean = false;

  shiftTypes = [
    { label: 'Two Shift', value: 'TWO_SHIFT' },
    { label: 'Three Shift', value: 'THREE_SHIFT' },
  ];
  shiftType: any;

  constructor(
    private scheduleService: ScheduleService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  formatDate(date: Date | string): string {
    let dateToFormat: Date;

    if (typeof date === 'string') {
      dateToFormat = new Date(date);
    } else if (date instanceof Date) {
      dateToFormat = date;
    } else {
      return ''; // Handle unexpected date types
    }

    // Add one day
    dateToFormat.setDate(dateToFormat.getDate() );

    // Return formatted date as yyyy-MM-dd
    return dateToFormat.toISOString().split('T')[0];
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Selected Shift Type:', this.shiftType?.value);
      this.loading = true;
  
      const formattedStartDate = this.formatDate(this.startDate);
      const isThreeShiftScenario = this.shiftType?.value === 'THREE_SHIFT';
      console.log('isThreeShiftScenario:', isThreeShiftScenario);
      this.scheduleService.generateSchedule(formattedStartDate, this.days, isThreeShiftScenario).subscribe({
        next: (response: any) => {
          console.log('Response:', response);
  
          this.msgs.push({
            severity: 'success',
            detail: response?.message || 'Schedule generated successfully!',
          });
          this.loading = false;
          this.autoHideMessages();
        },
        error: (error: any) => {
          console.log('Error:', error);
  
          const errorMessage = error.error?.message || 'An error occurred while generating the schedule.';
          this.msgs.push({ severity: 'error', detail: errorMessage });
          this.loading = false;
          this.autoHideMessages();
        },
      });
    } else {
      this.msgs.push({
        severity: 'warn',
        detail: 'Please fill out all required fields.',
      });
      this.autoHideMessages();
    }
  }
  

  private autoHideMessages() {
    setTimeout(() => {
      this.msgs = [];
    }, 4000); // Hide messages after 4 seconds
  }
}
