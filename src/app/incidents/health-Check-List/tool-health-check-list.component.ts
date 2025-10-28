import { Component, OnInit } from '@angular/core';
import { ToolHealthCheckService } from 'src/app/services/tool-health-check.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tool-health-check-list',
  templateUrl: './tool-health-check-list.component.html',
//   styleUrls: ['./tool-health-check-list.component.scss']
})
export class ToolHealthCheckListComponent implements OnInit {
  checks: any[] = [];
  loading = true;

  constructor(private toolService: ToolHealthCheckService) {}

  ngOnInit(): void {
    this.toolService.getAllChecks().subscribe({
      next: (data) => {
        this.checks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading health checks', err);
        this.loading = false;
      }
    });
  }
}
