import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {UserInfoService} from './shared/user-info/user-info.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
      const userInfoService = {
          getUserInfo: () => {
              return {
                  subscribe: jasmine.createSpy()
              };
          }
      };
    TestBed.configureTestingModule({
        providers: [{
            provide: UserInfoService, useValue: userInfoService
        }]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
