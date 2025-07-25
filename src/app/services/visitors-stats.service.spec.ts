import { TestBed } from '@angular/core/testing';

import { VisitorsStatsService } from './visitors-stats.service';

describe('VisitorsStatsService', () => {
  let service: VisitorsStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorsStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
