import { Component, OnInit } from '@angular/core';
import { ToolHealthCheckService } from 'src/app/services/tool-health-check.service';
import { MessageService } from 'primeng/api';

interface ToolCheckItemDTO {
  toolName: string;
  checkItem: string;
  response: string;
}

interface ToolHealthCheckDTO {
  analystName: string;
  shiftTime: string;
  items: ToolCheckItemDTO[];
}

@Component({
  selector: 'app-tool-health-check',
  templateUrl: './tool-health-check.component.html',
  styleUrls: ['./tool-health-check.component.scss'],
})
export class ToolHealthCheckComponent implements OnInit {
  check: ToolHealthCheckDTO = {
    analystName: '',
    shiftTime: '',
    items: [],
  };

  tempResponses: { [key: string]: string } = {}; // Keeps responses when switching tools
  selectedTool: string | null = null;
  filledTools: Set<string> = new Set();

  constructor(
    private toolHealthCheckService: ToolHealthCheckService,
    private messageService: MessageService
  ) {}

  toolIcons: { [tool: string]: string } = {
    SIEM: 'fas fa-server',
    EDR: 'fas fa-shield-alt',
    'Perimeter Firewall': 'fas fa-fire',
    'BIGIP WAF': 'fas fa-lock',
    'Grafana D': 'fas fa-chart-line',
    'Anti DDoS': 'fas fa-broadcast-tower',
    'Active Directory': 'fas fa-network-wired',
  };

  tools: {
    [tool: string]: { label: string; type: 'binary' | 'updown' | 'number' | 'text' }[];
  } = {
    SIEM: [
      { label: 'SIEM Device Availability', type: 'binary' },
      { label: 'Real time Log and Flow Monitoring', type: 'binary' },
      { label: 'User Behavior analytics (UBA)', type: 'binary' },
      { label: 'Log source integration status', type: 'text' },
      { label: 'Use Case Health', type: 'text' },
      { label: 'Offense / Alert Queue', type: 'text' },
      { label: 'Dashboard Availability', type: 'binary' },
      { label: 'Storage status (df -h)', type: 'text' },
      { label: 'Memory status (free)', type: 'text' },
      { label: 'Backup and Archive status', type: 'binary' },
      { label: 'Rule Tuning', type: 'binary' },
    ],
    EDR: [
      { label: 'Active threats are detected', type: 'text' },
      { label: 'Protection is disabled', type: 'text' },
      { label: 'Databases are outdated', type: 'number' },
      { label: 'Most infected device', type: 'text' },
      { label: 'Number of workstations with Vulnerabilities', type: 'number' },
      { label: 'Number of Servers with Vulnerabilities', type: 'number' },
      { label: 'Number of unassigned Devices', type: 'number' },
    ],
    'Perimeter Firewall': [
      { label: 'High/Critical Events – IPS, Antivirus, Anti-Bot, Threat Emulation, Threat Extraction', type: 'text' },
      { label: 'Attacks prevention status', type: 'binary' },
      { label: 'High risk applications', type: 'text' },
      { label: 'Infected Hosts', type: 'text' },
      { label: 'Health status of Gateway, CPU, memory, disk usage', type: 'text' },
      { label: 'Admin logins, failed login attempts', type: 'text' },
      { label: 'Log forwarding to SIEM', type: 'binary' },
    ],
    'BIGIP WAF': [
      { label: 'WAF Device Health Status', type: 'updown' },
      { label: 'HA Status', type: 'text' },
      { label: 'Log Forwarding to SIEM', type: 'binary' },
      { label: 'SSL Certificate status', type: 'text' },
    ],
    'Grafana D': [{ label: 'Dashboard Availability', type: 'binary' }],
    'Anti DDoS': [
      { label: 'ADSM Device Health status', type: 'updown' },
      { label: 'Storage status (Device with memory and CPU > 80%)', type: 'text' },
      { label: 'DDoS traffic within your Shift', type: 'binary' },
    ],
    'Active Directory': [{ label: 'AD Health Status', type: 'updown' }],
  };

  ngOnInit(): void {}

  getToolNames(): string[] {
    return Object.keys(this.tools);
  }

  selectTool(tool: string): void {
    this.selectedTool = tool;
  }

  getResponse(tool: string, checkItem: string): string {
    const found = this.check.items.find(i => i.toolName === tool && i.checkItem === checkItem);
    return found ? found.response : this.tempResponses[`${tool}-${checkItem}`] || '';
  }

  addResponse(tool: string, checkItem: string, response: string): void {
    const existing = this.check.items.find(i => i.toolName === tool && i.checkItem === checkItem);
    if (existing) {
      existing.response = response;
    } else {
      this.check.items.push({ toolName: tool, checkItem, response });
    }

    this.tempResponses[`${tool}-${checkItem}`] = response;

    const expectedCount = this.tools[tool].length;
    const actualCount = this.check.items.filter(i => i.toolName === tool).length;
    if (actualCount === expectedCount) {
      this.filledTools.add(tool);
    }
  }

  getBinaryClass(tool: string, label: string, value: string): string {
    const match = this.check.items.find(i => i.toolName === tool && i.checkItem === label);
    return match?.response === value
      ? 'bg-green-500 text-white'
      : 'bg-gray-600 text-gray-200 hover:bg-gray-500';
  }

  submit(): void {
    if (!this.check.analystName || !this.check.shiftTime || this.filledTools.size !== this.getToolNames().length) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Incomplete',
        detail: 'Please complete all tool checks before submitting.',
      });
      return;
    }

    this.toolHealthCheckService.submitCheck(this.check).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Submitted',
          detail: 'Tool health check submitted successfully.',
        });
        this.check.items = [];
        this.tempResponses = {};
        this.filledTools.clear();
        this.selectedTool = null;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Submission failed. Please try again.',
        });
        console.error('Submission error:', err);
      },
    });
  }
}
