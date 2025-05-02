import { TestBed } from '@angular/core/testing';

import { ProductFactoryService } from './product-factory.service';

describe('ProductFactoryService', () => {
  let service: ProductFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
