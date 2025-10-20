import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalyDetailComponent } from './anomaly-detail.component';

describe('AnomalyDetailComponent', () => {
  let component: AnomalyDetailComponent;
  let fixture: ComponentFixture<AnomalyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnomalyDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnomalyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
