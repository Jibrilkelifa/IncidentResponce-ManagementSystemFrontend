import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { EventDashboardService } from '../../services/CyberAIService/event-dashboard.service';

@Component({
  selector: 'app-cyberai-dashboard',
  templateUrl: './cyberai-dashboard.component.html',
  styleUrls: ['./cyberai-dashboard.component.scss']
})
export class CyberaiDashboardComponent implements OnInit {

  totalEvents:any;

  // Phishing
  benignCount:any;
  suspiciousCount:any;
  maliciousCount:any;

  // Anomaly
  normalCount :any;
  abnormalCount:any;

  // Threat Intel
  abuseIPLookups:any;
  virusTotalLookups:any;

  aiTrendData!: ChartData<'line'>;
  chartOptions!: ChartOptions;

  recentEvents: any[] = [];

  constructor(private cyberAIService: EventDashboardService) {}

  ngOnInit(): void {
    this.loadData();
  }

 loadData() {
  this.cyberAIService.getDashboardStats().subscribe(({ summary, recentEvents }) => {
    this.totalEvents = summary.totalEvents;

    this.benignCount = summary.benignCount;
    this.suspiciousCount = summary.suspiciousCount;
    this.maliciousCount = summary.maliciousCount;

    this.normalCount = summary.normalCount;
    this.abnormalCount = summary.abnormalCount;

    this.abuseIPLookups = summary.abuseIPLookups;
    this.virusTotalLookups = 0; // optional placeholder

  this.recentEvents = recentEvents;
  });

  this.chartOptions = {
    plugins: { legend: { labels: { color: '#cbd5e1' } } },
    scales: {
      x: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } },
      y: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } }
    }
  };
}


}
