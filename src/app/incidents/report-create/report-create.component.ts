import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IncidentService } from '../../services/incident.service';
import { SOCReport } from 'src/app/models/soc-report.model';
import { IncidentEntry } from 'src/app/models/incident-entry.model';

@Component({
  selector: 'app-create-report',
  templateUrl: 'report-create.component.html',
  styleUrls: ['report-create.component.scss'],
  providers: [MessageService]
})
export class SOCReportComponent {

  // Define shifts with label and value for p-dropdown
  shifts = [
    { label: 'Shift 1', value: 'Shift 1' },
    { label: 'Shift 2', value: 'Shift 2' },
    { label: 'Shift 3', value: 'Shift 3' }
  ];

  report: SOCReport = {
    shift: this.shifts[0].value,  // Default to "Shift 1"
    incidents: []
  };

  newIncident: IncidentEntry = {
    offenceName: '',
    rootCause: '',
    affectedAsset: '',
    ipAddress: '',
    recommendedAction: ''
  };

  loading: boolean = false;

  constructor(
    private socReportService: IncidentService,
    private messageService: MessageService
  ) {}

  // Adds a new incident to the report
  addIncident() {
    this.report.incidents.push({ ...this.newIncident });
    this.newIncident = { offenceName: '', rootCause: '', affectedAsset: '', ipAddress: '', recommendedAction: '' };
    this.messageService.add({ severity: 'info', summary: 'Incident Added', detail: 'Incident has been added to the report.' });
  }

  // Creates the SOC report by sending data to the backend
  createReport(): void {
    this.loading = true;
    console.log('SOC Report:', JSON.stringify(this.report, null, 2));

    this.socReportService.createSOCReport(this.report).subscribe(
      (createdReport) => {
        this.loading = false;
        console.log('SOC Report:', JSON.stringify(this.report, null, 2));

        this.report.id = createdReport.id; // Set report ID to enable download button
        this.messageService.add({ severity: 'success', summary: 'Report Created', detail: 'SOC Report created successfully!' });
        this.resetReportForm();
      },
      (error) => {
        this.loading = false;
        console.error('Error creating report:', error);
        this.messageService.add({ severity: 'error', summary: 'Creation Failed', detail: 'Failed to create SOC report.' });
      }
    );
  }

  // Resets the report form after submission
  private resetReportForm() {
    this.report = { shift: this.shifts[0].value, incidents: [] }; // Reset to default shift
  }

  // Downloads the generated SOC report as a PDF
  
}
