import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, AlertEvent } from 'src/app/services/CyberAIService/event.service';

@Component({
  selector: 'app-phishing-details',
  templateUrl: './phishing-detail.component.html',
  styleUrls: ['./phishing-detail.component.scss']
})
export class PhishingDetailComponent implements OnInit {
  id!: number;
  event?: AlertEvent;
  loading = true;
  keywords: any;
  phishingScore: any;

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

      // Use probability from backend
      this.phishingScore = data.probability;

      // Extract URLs (if found in enrichment)
      
    },
    error: (err) => {
      console.error('Error loading event:', err);
      this.loading = false;
    }
  });
}


  markFeedback(type: 'false-positive' | 'confirmed'): void {
    alert(`Feedback sent for Event #${this.id}: ${type}`);
    // Later we’ll post to backend feedback endpoint (e.g. /api/v1/events/{id}/feedback)
  }
}
