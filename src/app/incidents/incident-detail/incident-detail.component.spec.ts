import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDetailComponent } from './incident-detail.component';

describe('IncidentDetailComponent', () => {
  let component: IncidentDetailComponent;
  let fixture: ComponentFixture<IncidentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
