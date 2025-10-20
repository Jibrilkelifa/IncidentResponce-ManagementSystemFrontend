import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertEvent, EventService } from 'src/app/services/CyberAIService/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  events: AlertEvent[] = [];
  filteredEvents: AlertEvent[] = [];
  filter = { eventType: '', status: '', startDate: '', endDate: '' };

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        // Map to align with UI structure
        this.events = data.map(e => ({
          ...e,
          riskScore: e.probability,
          timestamp: e.createdAt
        }));
        this.filteredEvents = this.events;
      },
      error: (err) => console.error('Error loading events:', err)
    });
  }

  applyFilters(): void {
    this.filteredEvents = this.events.filter((e) => {
      const matchType = this.filter.eventType ? e.eventType === this.filter.eventType : true;
      const matchStatus = this.filter.status ? e.status === this.filter.status : true;
      const matchDate =
        (!this.filter.startDate || new Date(e.createdAt) >= new Date(this.filter.startDate)) &&
        (!this.filter.endDate || new Date(e.createdAt) <= new Date(this.filter.endDate));
      return matchType && matchStatus && matchDate;
    });
  }

  viewDetails(e: AlertEvent): void {
    if (e.source === 'email') {
      this.router.navigate(['/phishing', e.id]);
    } else if (e.source === 'qradar') {
      this.router.navigate(['/anomaly', e.id]);
    } else if (e.eventType === 'threat-intel') {
      this.router.navigate(['/threat-intel', e.id]);
    }
  }
}
