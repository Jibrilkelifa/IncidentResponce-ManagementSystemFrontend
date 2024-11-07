import { ComponentFixture, TestBed } from '@angular/core/testing';

import {SOCReportComponent } from './report-create.component';

describe('IncidentCreateComponent', () => {
  let component: SOCReportComponent;
  let fixture: ComponentFixture<SOCReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SOCReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SOCReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
