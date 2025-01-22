import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIncidentComponent } from './incident-create.component';

describe('IncidentCreateComponent', () => {
  let component: CreateIncidentComponent;
  let fixture: ComponentFixture<CreateIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIncidentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
