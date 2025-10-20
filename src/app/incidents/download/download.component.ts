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
    fromDate!: string;
  toDate!: string;
  loading = false;
  errorMessage = '';

  reportDate?: Date;
  selectedShift: string = this.shifts[0].value;

  constructor(
    private socReportService: IncidentService,
    private messageService: MessageService
  ) {}

downloadReport() {
  if (!this.fromDate || !this.toDate) {
    this.errorMessage = 'Please select both start and end dates.';
    return;
  }

  this.loading = true;
  this.errorMessage = ''; // Clear any previous error before making the request

  this.socReportService.getExportedIncidents(this.fromDate, this.toDate).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'incidents.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);

      this.loading = false;
      this.errorMessage = ''; // Ensure error message is cleared on success
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = err?.error?.error || 'Failed to download report.';
      this.loading = false;
    }
  });
}

  

  sendReportByEmail(): void {
    if (!this.reportDate || !this.selectedShift) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select a report date and shift.' });
      return;
    }

    this.loading = true;

    // Format reportDate to 'yyyy-MM-dd' before passing it to the service
    const formattedDate = this.formatDate(this.reportDate);

    // Fetch the reportId based on formattedDate and selectedShift
    this.socReportService.getSOCReportId(formattedDate, this.selectedShift).subscribe(
      (reportId) => {
        if (reportId) {
          // Send the report via email using the obtained reportId
          this.sendSOCReportByEmail(reportId);
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

  private sendSOCReportByEmail(reportId: number): void {
    this.socReportService.sendSOCReportEmail(reportId).subscribe(
      () => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Email Sent', detail: 'SOC Report sent via email successfully.' });
      },
      (error) => {
        this.loading = false;
        console.error('Error sending report email:', error);
        this.messageService.add({ severity: 'error', summary: 'Email Error', detail: 'Failed to send the SOC Report by email.' });
      }
    );
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
