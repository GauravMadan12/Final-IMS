import { TestBed, inject } from '@angular/core/testing';

import { ImsserviceService } from './imsservice.service';

describe('ImsserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImsserviceService]
    });
  });

  it('should be created', inject([ImsserviceService], (service: ImsserviceService) => {
    expect(service).toBeTruthy();
  }));
});
