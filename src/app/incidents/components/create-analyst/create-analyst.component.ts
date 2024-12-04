import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Userr } from '../../../models/userr';
import { MessageService } from 'primeng/api';
import { AnalystService } from '../../../services/analyst/analystService';

@Component({
  selector: 'app-create-analyst',
  templateUrl: './create-analyst.component.html',
  styleUrls: ['./create-analyst.component.scss']
})
export class CreateAnalystComponent implements OnInit {
  user: Userr = { id: 0, name: '', gender: '', location: '', isAvailabel: true };
  msgs: any[] = [];
  loading: boolean = false;

  constructor(
    private analystService: AnalystService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.analystService.createUser(this.user).subscribe({
        next: (response: Userr) => {
          console.log('Success:', response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'SOC Analyst Created Successfully' });
          this.loading = false;
          this.autoHideMessages();
          form.reset();
        },
        error: (error: any) => {
          console.error('Error:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message || 'An error occurred' });
          this.loading = false;
          this.autoHideMessages();
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill out all required fields' });
    }
  }

  private autoHideMessages() {
    setTimeout(() => {
      this.msgs = [];
    }, 3000); // Hide messages after 3 seconds
  }
}
