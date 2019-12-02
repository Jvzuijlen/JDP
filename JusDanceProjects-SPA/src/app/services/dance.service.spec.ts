/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DanceService } from './dance.service';

describe('Service: Dance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DanceService]
    });
  });

  it('should ...', inject([DanceService], (service: DanceService) => {
    expect(service).toBeTruthy();
  }));
});
