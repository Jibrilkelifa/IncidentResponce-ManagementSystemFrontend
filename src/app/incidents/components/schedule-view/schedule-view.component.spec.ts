import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleViewComponent } from './schedule-view.component';

describe('AllMessagesComponent', () => {
  let component: ScheduleViewComponent;
  let fixture: ComponentFixture<ScheduleViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleViewComponent]
    });
    fixture = TestBed.createComponent(ScheduleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
