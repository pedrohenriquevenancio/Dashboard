import { TestBed } from '@angular/core/testing';

import { HogwartsHousesService } from './hogwarts-houses.service';

describe('HogwartsHousesService', () => {
  let service: HogwartsHousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HogwartsHousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
