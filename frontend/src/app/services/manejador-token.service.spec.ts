import { TestBed } from '@angular/core/testing';

import { ManejadorTokenService } from './manejador-token.service';

describe('ManejadorTokenService', () => {
  let service: ManejadorTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejadorTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
