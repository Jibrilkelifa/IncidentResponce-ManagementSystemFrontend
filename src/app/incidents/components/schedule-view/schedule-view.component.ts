import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../services/schedule/scheduleService';
import { Schedule } from '../../../models/schedule';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'schedule-view',
  templateUrl: './schedule-view.component.html',
  providers: [ConfirmationService, MessageService]
})
export class ScheduleViewComponent implements OnInit {
  loading: boolean = false;
  schedules: Schedule[] = [];
  paginatedSchedules: Schedule[] = [];
  totalRecords = 0;
  rows = 10;
  sortDirection: string = 'asc';
  currentPage = 0;
  totalPages: number[] = [];
  isAdmin: boolean = false;
  isThreeShiftSchedule: boolean = false; // Flag to determine if the schedule is three-shift

  constructor(
    private scheduleService: ScheduleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadSchedules();
    this.isAdmin = true; // Just for testing, you can modify this as per your role management
  }

  loadSchedules() {
    this.scheduleService.getSchedules().subscribe((data: any) => {
      console.log('Received data:', data);
      // Assuming you have a way to determine the schedule type
      this.isThreeShiftSchedule = this.checkIfThreeShiftSchedule(data);
      this.schedules = this.formatSchedules(data);
      this.totalRecords = this.schedules.length;
      this.calculateTotalPages();
      this.loadPage();
    });
  }

  checkIfThreeShiftSchedule(data: any): boolean {
    // Check if the schedule has "Shift 3" to determine if it is three-shift
    return data && data[Object.keys(data)[0]]?.shifts?.['Shift 3'] ? true : false;
  }

  formatSchedules(data: { [date: string]: any }): any[] {
    // Check the structure of the data to ensure it's formatted correctly
    return Object.entries(data).map(([date, shifts]) => ({
        date,
        shifts: {
            'Shift 1': shifts['Shift 1'] || [], // Make sure `shifts['Shift 1']` exists
            'Shift 2': shifts['Shift 2'] || [], // Make sure `shifts['Shift 2']` exists
            'Shift 3': shifts['Shift 3'] || [], // Make sure `shifts['Shift 3']` exists
            'Day-Off': shifts['Day-Off'] || [],  // Make sure `shifts['Day-Off']` exists
            'Regular Job': shifts['Regular Job'] || [], // Make sure `shifts['Regular Job']` exists
        },
    }));
}
sortByDate() {
  if (this.sortDirection === 'asc') {
    this.schedules.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.sortDirection = 'desc';
  } else {
    this.schedules.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.sortDirection = 'asc';
  }
  this.loadPage(); // Recalculate the page after sorting
}

  // Calculate total pages based on the total records and rows per page
  calculateTotalPages(): void {
    const totalPages = Math.ceil(this.totalRecords / this.rows);
    this.totalPages = Array(totalPages).fill(0).map((_, i) => i);
  }

  // Load incidents for the current page
  loadPage(): void {
    const start = this.currentPage * this.rows;
    const end = start + this.rows;
    this.paginatedSchedules = this.schedules.slice(start, end);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPage();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages.length - 1) {
      this.currentPage++;
      this.loadPage();
    }
  }

  goToPage(index: number): void {
    this.currentPage = index;
    this.loadPage();
  }

  deleteAllSchedules() {
    this.loading = true; // Start loading indicator
    console.log("Delete All Schedules button clicked");

    this.scheduleService.deleteAllSchedules().subscribe({
        next: () => {
            this.schedules = [];
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'All schedules have been deleted' });
            this.loading = false; // Stop loading indicator
        },
        error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete schedules' });
            console.error('Failed to delete schedules:', error);
            this.loading = false; // Stop loading indicator
        }
    });
  }
}
