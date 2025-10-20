import { Component, OnInit } from "@angular/core";
import { Alert } from "src/app/models/grafanaAlert";
import { GrafanaAlertService } from "src/app/services/grafanaService";

@Component({
  selector: 'app-grafana-alerts',
  templateUrl: './grafana-alert.component.html',
  styleUrls: ['./grafana-alert.component.scss']
})
export class GrafanaAlertsComponent implements OnInit {
  alerts: Alert[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 10;
  totalAlerts: number = 0;
  visiblePages: number[] = []; // Pages to display in the UI
  pageRange = 3
    incidents: Alert[] = [];          
    paginatedAlerts: Alert[] = [];  
    totalRecords = 0;                   
    rows = 10;                                            
    totalPages: number[] = [];           

  constructor(private grafanaAlertService: GrafanaAlertService) {}

  ngOnInit(): void {
    this.fetchAlerts();
  }

  // Fetch Alerts from the Service
  fetchAlerts(): void {
    this.grafanaAlertService.getAlerts().subscribe({
      next: (data: Alert[]) => {
        this.alerts = data;
        this.totalAlerts = data.length;
        this.loading = false;
        this.totalPages = Array(Math.ceil(this.totalAlerts / this.pageSize)).fill(0).map((x, i) => i);
        this.loadPage();  // Load the first page
        this.updateVisiblePages();  // Update visible pages after data load
      },
      error: (error: any) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }
  
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPage();
    }
  }
  loadPage(): void {
    const start = this.currentPage * this.rows;
    const end = start + this.rows;
    this.paginatedAlerts = this.alerts.slice(start, end);
    this.updateVisiblePages(); // Add this line to update visible pages
  }
  

  
  nextPage(): void {
    if (this.currentPage < this.totalPages.length - 1) {
      this.currentPage++;
      this.loadPage();
    }
  }

  
  // goToPage(index: number): void {
  //   this.currentPage = index;
  //   this.loadPage();
  // }
  goToPage(index: number): void {
    if (index >= 0 && index < this.totalPages.length) {
      this.currentPage = index;
      this.loadPage();
      this.updateVisiblePages();
    }
  }
  

  // Handles page change when paginator is used
  onPageChange(event: any): void {
    this.currentPage = event.page;
    this.pageSize = event.rows;
  }
  updateVisiblePages(): void {
    const start = Math.max(0, this.currentPage - this.pageRange);
    const end = Math.min(this.totalPages.length, this.currentPage + this.pageRange + 1);
  
    this.visiblePages = [];
    if (start > 0) this.visiblePages.push(0); // Always include the first page
    if (start > 1) this.visiblePages.push(-1); // Indicator for skipped pages
  
    for (let i = start; i < end; i++) {
      this.visiblePages.push(i);
    }
  
    if (end < this.totalPages.length - 1) this.visiblePages.push(-1); // Indicator for skipped pages
    if (end < this.totalPages.length) this.visiblePages.push(this.totalPages.length - 1); // Always include the last page
}


}
