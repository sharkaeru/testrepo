import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CustomerFormData } from '../models/customer-form-data';
import { CustomerFormGroup } from '../models/customer-form-group';
import { CustomerValidators } from '../validators/customer.validators';

@Injectable({
  providedIn: 'root'
})
export class CustomerFormService {
  constructor(private fb: FormBuilder) {}

  createForm(): CustomerFormGroup {
    return this.fb.group({
      username: this.fb.nonNullable.control('', CustomerValidators.username),
      firstName: this.fb.nonNullable.control('', CustomerValidators.firstName),
      lastName: this.fb.nonNullable.control('', CustomerValidators.lastName),
      email: this.fb.nonNullable.control('', CustomerValidators.email),
      birthdate: this.fb.control<Date | null>(null),
      address: this.fb.nonNullable.control(''),
      city: this.fb.nonNullable.control(''),
      state: this.fb.nonNullable.control('', CustomerValidators.state),
      zip: this.fb.nonNullable.control('')
    });
  }

  createFormFromCustomer(customer: CustomerFormData): CustomerFormGroup {
    return this.fb.group({
      username: this.fb.nonNullable.control(customer.username, CustomerValidators.username),
      firstName: this.fb.nonNullable.control(customer.firstName, CustomerValidators.firstName),
      lastName: this.fb.nonNullable.control(customer.lastName, CustomerValidators.lastName),
      email: this.fb.nonNullable.control(customer.email, CustomerValidators.email),
      birthdate: this.fb.control<Date | null>(
        customer.birthdate ? new Date(customer.birthdate) : null
      ),
      address: this.fb.nonNullable.control(customer.address),
      city: this.fb.nonNullable.control(customer.city),
      state: this.fb.nonNullable.control(customer.state, CustomerValidators.state),
      zip: this.fb.nonNullable.control(customer.zip)
    });
  }
}