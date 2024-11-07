import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { TooltipItem } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalIncidents: number = 0;
  openIncidents: number = 0;
  closedIncidents: number = 0;
  affectedSystemCounts: { system: string, count: number }[] = [];
  sourceCorrelations: { source: string, incidents: Incident[] }[] = [];
  escalatedIncidents: { escalatedTo: string, count: number, incidents: Incident[] }[] = [];
  affectedSystemsChartData: any;
  chartOptions: any;
  sourceChartData: any;
  escalatedIncidentsChartData:any;

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.getIncidentStats();
    this.getAffectedSystemCounts();
    this.getSourceCorrelations();
    this.getEscalatedIncidentGroups();
  }

  getIncidentStats() {
    this.incidentService.getIncidents().subscribe((incidents) => {
      this.totalIncidents = incidents.length;
      this.openIncidents = incidents.filter(incident => incident.status === 'Open').length;
      this.closedIncidents = incidents.filter(incident => incident.status === 'Closed').length;
    });
  }

  getAffectedSystemCounts() {
    this.incidentService.getCountByAffectedSystem().subscribe((data) => {
      this.affectedSystemCounts = Object.entries(data).map(([system, count]) => ({
        system,
        count: count as number
      }));
      this.generateAffectedSystemsChartData(); // Populate chart data after fetching counts
    });
  }
  generateAffectedSystemsChartData() {
    this.affectedSystemsChartData = {
      labels: this.affectedSystemCounts.map(item => item.system),
      datasets: [
        {
          data: this.affectedSystemCounts.map(item => item.count),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Add more colors if needed
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }
      ]
    };
  
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false, // This allows the chart to adjust to container's aspect ratio
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14 // Adjust this as needed for readability
            }
          }
        }
      }
    };
  }
  
  
  getSourceCorrelations() {
    this.incidentService.getIncidentsWithMultipleSources().subscribe((data) => {
      this.sourceCorrelations = Object.entries(data).map(([source, incidents]) => ({
        source,
        incidents: incidents as Incident[]
      }));
      this.generateSourceChartData(); // Generate chart data for source correlations
    });
  }

  // Generate chart data for source correlations (Bar Chart)
  generateSourceChartData() {
    this.sourceChartData = {
      labels: this.sourceCorrelations.map(item => item.source), // Source names
      datasets: [
        {
          label: 'Incident Count',
          data: this.sourceCorrelations.map(item => item.incidents.length), // Incident counts
          backgroundColor: this.sourceCorrelations.map(item => {
            const incidentCount = item.incidents.length;
            if (incidentCount > 2) {
              return '#36A2EB';  
            } else if (incidentCount > 1) {
              return '#FF6384'; 
            } else {
              return '#4CAF50';  
            }
          }),
          borderColor: this.sourceCorrelations.map(item => {
            const incidentCount = item.incidents.length;
            if (incidentCount > 2) {
              return '#36A2EB';  
            } else if (incidentCount > 1) {
              return '#FF6384';  
            } else {
              return '#388E3C';  
            }
          }),
          borderWidth: 1
        }
      ]
    };
  }
  

  
  
  getEscalatedIncidentGroups() {
    this.incidentService.getEscalatedIncidentsGroupedByEscalatedTo().subscribe((data) => {
      this.escalatedIncidents = Object.entries(data).map(([escalatedTo, incidents]) => ({
        escalatedTo,
        count: (incidents as Incident[]).length,  // Get the count of incidents for each escalatedTo
        incidents: incidents as Incident[]  // Explicitly cast incidents to Incident[]
      }));
  
      // Generate data for the bar chart
      this.generateEscalatedIncidentsChartData();
    });
  }
  
  // Method to generate the bar chart data for escalated incidents
  generateEscalatedIncidentsChartData() {
    this.escalatedIncidentsChartData = {
      labels: this.escalatedIncidents.map(group => group.escalatedTo),
      datasets: [
        {
          label: 'Incident Count',
          data: this.escalatedIncidents.map(group => group.count),
          backgroundColor: ['#FF4C4C', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          hoverBackgroundColor: ['#FF4C4C', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => {  
              return `${tooltipItem.label}: ${tooltipItem.raw} incidents`; // Custom tooltip text
            }
          }
        }
      }
    };
  }
}
