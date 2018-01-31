import { TestBed, inject } from '@angular/core/testing';

import { GetDriversService } from './get-drivers.service';

describe('GetDriversService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDriversService]
    });
  });

  it('should be created', inject([GetDriversService], (service: GetDriversService) => {
    expect(service).toBeTruthy();
  }));
});
