import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-download',
  templateUrl: 'download.component.html',
  styleUrls: ['download.component.scss'],
  providers: [MessageService]
})
export class DownloadComponent {
  shifts = [
    { label: 'Shift 1', value: 'Shift 1' },
    { label: 'Shift 2', value: 'Shift 2' },
    { label: 'Shift 3', value: 'Shift 3' }
  ];

  reportDate: Date | null = null; // Changed to Date type
  selectedShift: string = this.shifts[0].value;
  loading: boolean = false;

  constructor(
    private socReportService: IncidentService,
    private messageService: MessageService
  ) {}

  downloadReport(): void {
    if (!this.reportDate || !this.selectedShift) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select a report date and shift.' });
      return;
    }

    this.loading = true;

    // Format reportDate to 'yyyy-MM-dd' before passing it to the service
    const formattedDate = this.reportDate.toISOString().split('T')[0];

    // Fetch the reportId based on formattedDate and selectedShift
    this.socReportService.getSOCReportId('2024-11-05 11:55:24.552829', this.selectedShift).subscribe(
      (reportId) => {
        if (reportId) {
          // Download the report PDF using the obtained reportId
          this.downloadSOCReport(reportId);
        } else {
          this.loading = false;
          this.messageService.add({ severity: 'warn', summary: 'No Report Found', detail: 'No report found for the given date and shift.' });
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching report ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch report ID.' });
      }
    );
  }

  private downloadSOCReport(reportId: number): void {
    this.socReportService.downloadSOCReportPdf(reportId).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SOC_Report_${this.reportDate}_${this.selectedShift}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Download Successful', detail: 'SOC Report downloaded successfully.' });
      },
      (error) => {
        this.loading = false;
        console.error('Error downloading report:', error);
        this.messageService.add({ severity: 'error', summary: 'Download Error', detail: 'Failed to download the SOC Report.' });
      }
    );
  }
}
