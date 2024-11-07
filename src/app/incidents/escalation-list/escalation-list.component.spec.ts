import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationListComponent } from './escalation-list.component';

describe('IncidentListComponent', () => {
  let component: EscalationListComponent;
  let fixture: ComponentFixture<EscalationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscalationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscalationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
