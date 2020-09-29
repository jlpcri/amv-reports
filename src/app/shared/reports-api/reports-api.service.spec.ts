import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReportsApiService } from './reports-api.service';

describe('ReportsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
  }).compileComponents()
  );

  it('should be created', () => {
    const service: ReportsApiService = TestBed.get(ReportsApiService);
    expect(service).toBeTruthy();
  });
});
