import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';

import { UserInfoService } from './user-info.service';

describe('UserInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
  }).compileComponents());

  it('should be created', () => {
    const service: UserInfoService = TestBed.get(UserInfoService);
    expect(service).toBeTruthy();
  });
});
