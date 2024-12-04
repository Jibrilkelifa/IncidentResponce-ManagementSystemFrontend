import { Component, OnInit } from '@angular/core';
import { AnalystService } from '../../../services/analyst/analystService';
import { Userr } from '../../../models/userr';

@Component({
  selector: 'analyst-view',
  templateUrl: 'analyst-view.component.html',
})
export class AnalystViewComponent implements OnInit {

  users: Userr[] = [];

  constructor(private analystService: AnalystService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.analystService.getAllUsers().subscribe((data: Userr[]) => {
      this.users = data;
    });
  }


}
