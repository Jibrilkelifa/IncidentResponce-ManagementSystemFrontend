import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  currentPage = 0; // Current page index
visiblePages: number[] = []; // Pages to display in the UI
pageRange = 3
  incidents: Incident[] = [];          
  paginatedIncidents: Incident[] = [];  
  totalRecords = 0;                   
  rows = 10;                                            
  totalPages: number[] = [];           
  searchTerm: string = '';            
  totalIncidents: any;
  criticalIncident: any;
  closedIncidents: any;
  openIncidents: any;
  constructor(private incidentService: IncidentService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getIncidents();
    this.route.queryParams.subscribe((params: Params) => {
      const status = params['status'];
      const severity = params['severity'];
      if (status) {
        this.filterIncidentsByStatus(status);
      }
      if (severity) {
        this.filterIncidentsByStatus(severity);
      }
    });
  }

  getIncidents(): void {
    this.incidentService.getIncidents().subscribe((data: Incident[]) => {
      this.incidents = data;
      this.totalRecords = this.incidents.length;
      this.calculateTotalPages();
      this.loadPage();  
    });
  }
  
getIncidentStats(): void {
  this.incidentService.getIncidentSummary().subscribe(summary => {
    this.totalIncidents = summary.totalIncidents;
    this.closedIncidents = summary.resolvedIncidents;
    this.openIncidents = summary.openIncidents;
    this.criticalIncident = summary.criticalHighIncidents;
  });
}


  calculateTotalPages(): void {
    const totalPages = Math.ceil(this.totalRecords / this.rows);
    this.totalPages = Array(totalPages).fill(0).map((_, i) => i);
    this.updateVisiblePages();
  }


  
  loadPage(): void {
    const start = this.currentPage * this.rows;
    const end = start + this.rows;
    this.paginatedIncidents = this.incidents.slice(start, end);
  }

  
  onSearch(): void {
    if (this.searchTerm.trim()) {
        this.incidentService.searchIncidents(this.searchTerm).subscribe((data: Incident[]) => {
            this.incidents = data;
            this.totalRecords = this.incidents.length;
            this.calculateTotalPages();
            this.loadPage();
        });
    } else {
        this.getIncidents(); 
    }
}
filterIncidentsByStatus(status: string | string[]): void {
  this.incidentService.getIncidents().subscribe((data: Incident[]) => {
    if (Array.isArray(status)) {
      this.incidents = data.filter((incident) => status.includes(incident.severity));
    } else {
      this.incidents = data.filter((incident) => incident.status === status);
    }
    this.totalRecords = this.incidents.length;
    this.calculateTotalPages();
    this.loadPage();
  });
}

getIncidentsByFilter(filter: string): void {
  if (filter === 'today') {
    this.incidentService.getTodaysIncidents().subscribe((data: Incident[]) => {
      this.incidents = data;
      this.totalRecords = this.incidents.length;
      this.calculateTotalPages();
      this.loadPage();
    });
  } else if (filter === 'week') {
    this.incidentService.getThisWeeksIncidents().subscribe((data: Incident[]) => {
      this.incidents = data;
      this.totalRecords = this.incidents.length;
      this.calculateTotalPages();
      this.loadPage();
    });
  } else if (filter === 'month') {
    this.incidentService.getThisMonthsIncidents().subscribe((data: Incident[]) => {
      this.incidents = data;
      this.totalRecords = this.incidents.length;
      this.calculateTotalPages();
      this.loadPage();
    });
  }
}


  
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPage();
    }
  }

  
  nextPage(): void {
    if (this.currentPage < this.totalPages.length - 1) {
      this.currentPage++;
      this.loadPage();
    }
  }

  
  // goToPage(index: number): void {
  //   this.currentPage = index;
  //   this.loadPage();
  // }
  goToPage(index: number): void {
    if (index >= 0 && index < this.totalPages.length) {
      this.currentPage = index;
      this.loadPage();
      this.updateVisiblePages();
    }
  }
  
updateVisiblePages(): void {
      const start = Math.max(0, this.currentPage - this.pageRange);
      const end = Math.min(this.totalPages.length, this.currentPage + this.pageRange + 1);
    
      this.visiblePages = [];
      if (start > 0) this.visiblePages.push(0); // Always include the first page
      if (start > 1) this.visiblePages.push(-1); // Indicator for skipped pages
    
      for (let i = start; i < end; i++) {
        this.visiblePages.push(i);
      }
    
      if (end < this.totalPages.length - 1) this.visiblePages.push(-1); // Indicator for skipped pages
      if (end < this.totalPages.length) this.visiblePages.push(this.totalPages.length - 1); // Always include the last page
  }

  
  viewIncident(id: number): void {
    this.router.navigate(['incident', id]); 
  }
}
