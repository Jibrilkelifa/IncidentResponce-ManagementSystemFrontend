import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-system-health',
  templateUrl: './system-health.component.html',
  styleUrls: ['./system-health.component.scss']
})
export class SystemHealthComponent implements OnInit {
  rabbitStatus = 'Up';
  coreHubStatus = 'Running';
  microserviceHeartbeat = true;
  queueBacklog = 12;

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart(): void {
    const ctx = document.getElementById('systemHealthChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'System Load (%)',
            data: [40, 55, 60, 50, 70, 65, 45],
            borderColor: '#60A5FA',
            backgroundColor: 'rgba(96,165,250,0.2)',
            fill: true,
            tension: 0.4,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: '#E5E7EB' }
          }
        },
        scales: {
          x: {
            ticks: { color: '#9CA3AF' },
            grid: { color: '#374151' }
          },
          y: {
            ticks: { color: '#9CA3AF' },
            grid: { color: '#374151' }
          }
        }
      }
    });
  }
}
