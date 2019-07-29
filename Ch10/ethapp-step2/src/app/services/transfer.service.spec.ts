import { TestBed } from '@angular/core/testing';

import { TransferService } from './transfer.service';

describe('TransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransferService = TestBed.get(TransferService);
    expect(service).toBeTruthy();
  });
});
