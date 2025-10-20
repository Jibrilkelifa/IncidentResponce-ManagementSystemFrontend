import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { EventService, AlertEvent } from 'src/app/services/CyberAIService/event.service';

@Component({
  selector: 'app-anomaly-details',
  templateUrl: './anomaly-detail.component.html',
  styleUrls: ['./anomaly-detail.component.scss']
})
export class AnomalyDetailComponent implements OnInit {
  id!: number;
  event?: AlertEvent;
  anomalyScore: any;
  featureVector: any = {}
  chart: any;
  loading = true;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

 ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    this.id = +idParam; // convert string → number safely
    this.loadEvent();
  } else {
    console.error('No event ID found in route.');
    this.loading = false;
  }
}


loadEvent(): void {
  this.eventService.getEventById(+this.id).subscribe({
    next: (data) => {
      this.event = data;
      this.loading = false;

      // Use backend anomaly probability
      this.anomalyScore = data.probability;

      // Load chart using parsed features
      this.loadChart();
    },
    error: (err) => {
      console.error('Error loading event:', err);
      this.loading = false;
    }
  });
}


loadChart(): void {
  const ctx = document.getElementById('anomalyChart') as HTMLCanvasElement;
  if (!ctx || !this.featureVector) return;

  const labels = Object.keys(this.featureVector);
  const values = Object.values(this.featureVector);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Feature Contribution',
          data: values,
          backgroundColor: '#60A5FA',
        },
      ],
    },
    options: {
      plugins: { legend: { labels: { color: '#E5E7EB' } } },
      scales: {
        x: { ticks: { color: '#9CA3AF' }, grid: { color: '#374151' } },
        y: { ticks: { color: '#9CA3AF' }, grid: { color: '#374151' } },
      },
    },
  });
}

}
