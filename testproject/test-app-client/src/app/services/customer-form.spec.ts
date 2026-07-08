import { TestBed } from '@angular/core/testing';

import { CustomerForm } from './customer-form';

describe('CustomerForm', () => {
  let service: CustomerForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
