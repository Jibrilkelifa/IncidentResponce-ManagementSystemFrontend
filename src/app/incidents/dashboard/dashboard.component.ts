import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { ScheduleService } from 'src/app/services/schedule/scheduleService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalIncidents: number = 0;
  openIncidents: number = 0;
  closedIncidents: number = 0;
  criticalIncident:number =0;
  criticalHighIncidents: Incident[] = [];
  incidentTrendData: any;
  chartOptions: any; 
  currentShiftUser: string = 'Loading...';
  nextShiftUser: string = 'Loading...';

  constructor(private incidentService: IncidentService ,  private router: Router, private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.getIncidentStats();
    this.getShiftDetails();
    this.getIncidentTrend(); // Fetch incident trend data
  }

  // Fetch Incident Statistics
  getIncidentStats(): void {
    this.incidentService.getIncidents().subscribe((incidents) => {
      this.totalIncidents = incidents.length;
      this.criticalIncident = incidents.filter(
        (incident) => incident.severity === 'Critical' || incident.severity === 'High'
      ).length;
      this.openIncidents = incidents.filter((incident) => incident.status === 'Open').length;
      this.closedIncidents = incidents.filter((incident) => incident.status === 'Resolved').length;
    });
  }

  // Fetch Incident Trends (Fluctuating Data)
  getIncidentTrend(): void {
    this.incidentService.getIncidentTrend().subscribe((trendData) => {
      // Extract dates and their corresponding counts
      const dates = Object.keys(trendData);
      const incidentCounts = dates.map(date => trendData[date]); // Directly use the count
  
      this.incidentTrendData = {
        labels: dates, // Dates for X-axis
        datasets: [
          {
            label: 'Incident Trend',
            data: incidentCounts, // Incident counts for Y-axis
            borderColor: '#FF5733',
            backgroundColor: 'rgba(255, 87, 51, 0.2)',
            fill: true,
            tension: 0.4, // Smooth line
          },
        ],
      };
  
      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) => `${tooltipItem.raw} incidents`, // Custom tooltip text
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Number of Incidents',
            },
            beginAtZero: true,
          },
        },
      };
    });
  }
  getShiftDetails(): void {
    this.scheduleService.getCurrentShift().subscribe((data) => {
      this.currentShiftUser = data.shift || 'No Analyst on Duty';  // Get shift value from JSON response
    });
  
    this.scheduleService.getNextShift().subscribe((data) => {
      this.nextShiftUser = data.shift || 'No Analyst Assigned';  // Get shift value from JSON response
    });
  }
  redirectToIncidentList(filter?: string): void {
    const queryParams: any = {};
    if (filter) {
      queryParams.status = filter === 'CriticalHigh' ? ['Critical', 'High'] : filter;
    }
    this.router.navigate(['/incidents'], { queryParams });
  }
  
  
}
