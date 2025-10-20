import { Component } from '@angular/core';

@Component({
  selector: 'app-threat-intel',
  templateUrl: './threat-intel.component.html',
  styleUrls: ['./threat-intel.component.scss']
})
export class ThreatIntelComponent {
  query: string = '';
  loading = false;
  error = '';
  result: any = null;

  // Simulated data for now (to preview UI)
  mockData = [
    {
      query: '45.77.11.23',
      reputation: 'malicious',
      threat_score: 9,
      confidence: 88,
      categories: ['botnet', 'c2', 'phishing'],
      last_seen: '2025-10-04T12:45:00Z',
      source: 'QRadar X-Force'
    },
    {
      query: '8.8.8.8',
      reputation: 'benign',
      threat_score: 0,
      confidence: 100,
      categories: ['dns', 'infrastructure'],
      last_seen: '2025-10-03T08:30:00Z',
      source: 'QRadar X-Force'
    }
  ];

  performLookup(): void {
    this.loading = true;
    this.error = '';
    this.result = null;

    setTimeout(() => {
      const found = this.mockData.find(item => item.query === this.query.trim());
      if (found) {
        this.result = found;
      } else {
        this.error = 'No match found in QRadar X-Force threat data.';
      }
      this.loading = false;
    }, 1000);
  }
}
