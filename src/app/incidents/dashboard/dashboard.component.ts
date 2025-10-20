import { Component, OnInit, OnDestroy } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { ScheduleService } from 'src/app/services/schedule/scheduleService';
import { GrafanaAlertService } from 'src/app/services/grafanaService';
import { Alert } from 'src/app/models/grafanaAlert';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalIncidents: number = 0;
  openIncidents: number = 0;
  closedIncidents: number = 0;
  criticalIncident: number = 0;
  criticalHighIncidents: Incident[] = [];
  incidentTrendData: any;
  chartOptions: any; 
  currentShiftUser: string = 'Loading...';
  nextShiftUser: string = 'Loading...';

  // 🔴 Grafana Alert Properties
  alerts: Alert[] = [];
  lastUpdated: Date | null = null;
  alertSubscription: Subscription | null = null;

  constructor(
    private incidentService: IncidentService,
    private router: Router,
    private scheduleService: ScheduleService,
    private grafanaAlertService: GrafanaAlertService
  ) {}

  ngOnInit(): void {
    this.getIncidentStats();
    this.getShiftDetails();
    this.getIncidentTrend();
    this.fetchAlerts(); // Initial fetch

    // 🕒 Auto-fetch alerts every 5 minutes
    this.alertSubscription = interval(300000).subscribe(() => {
      console.log("🔄 Auto-fetching alerts...");
      this.fetchAlerts();
    });
  }

  // ✅ Fetch Incident Statistics
getIncidentStats(): void {
  this.incidentService.getIncidentSummary().subscribe(summary => {
    this.totalIncidents = summary.totalIncidents;
    this.closedIncidents = summary.resolvedIncidents;
    this.openIncidents = summary.openIncidents;
    this.criticalIncident = summary.criticalHighIncidents;
  });
}


  // ✅ Fetch Incident Trends
  getIncidentTrend(): void {
    this.incidentService.getIncidentTrend().subscribe((trendData) => {
      const dates = Object.keys(trendData);
      const incidentCounts = dates.map(date => trendData[date]); 
  
      this.incidentTrendData = {
        labels: dates,
        datasets: [
          {
            label: 'Incident Trend',
            data: incidentCounts,
            borderColor: '#FF5733',
            backgroundColor: 'rgba(255, 87, 51, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      };
  
      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: { label: (tooltipItem: any) => `${tooltipItem.raw} incidents` },
          },
        },
        scales: {
          x: { title: { display: true, text: 'Date' } },
          y: { title: { display: true, text: 'Number of Incidents' }, beginAtZero: true },
        },
      };
    });
  }

  // ✅ Fetch Shift Details
  getShiftDetails(): void {
    this.scheduleService.getCurrentShift().subscribe((data) => {
      this.currentShiftUser = data.shift || 'No Analyst on Duty';
    });
    this.scheduleService.getNextShift().subscribe((data) => {
      this.nextShiftUser = data.shift || 'No Analyst Assigned';
    });
  }

  // ✅ Fetch Alerts from Grafana
  fetchAlerts(): void {
    this.grafanaAlertService.fetchAndSaveAlerts().subscribe({
      next: (data: Alert[]) => {
        this.alerts = data.slice(0, 3); // Show only top 3 alerts
        this.lastUpdated = new Date();
      },
      error: (error: any) => {
        console.error("⚠️ Error fetching alerts:", error);
      }
    });
  }

  // ✅ Navigate to Incident List with Filters
  redirectToIncidentList(filter?: string): void {
    const queryParams: any = {};
    if (filter) {
      queryParams.status = filter === 'CriticalHigh' ? ['Critical', 'High'] : filter;
    }
    this.router.navigate(['/incidents'], { queryParams });
  }

  // ✅ Cleanup Subscription on Component Destroy
  ngOnDestroy(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }
}
