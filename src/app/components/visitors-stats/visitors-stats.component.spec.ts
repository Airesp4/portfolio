import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsStatsComponent } from './visitors-stats.component';

describe('VisitorsStatsComponent', () => {
  let component: VisitorsStatsComponent;
  let fixture: ComponentFixture<VisitorsStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorsStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
