import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberaiDashboardComponent } from './cyberai-dashboard.component';

describe('CyberaiDashboardComponent', () => {
  let component: CyberaiDashboardComponent;
  let fixture: ComponentFixture<CyberaiDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberaiDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyberaiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
