import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerFormData } from '../models/customer-form-data';

@Injectable({
  providedIn: 'root'
})
export class CustomerForm {
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: [null],
      address: [''],
      city: [''],
      state: ['', Validators.required],
      zip: ['']
    });
  }

  createFormFromCustomer(customer: CustomerFormData): FormGroup {
    return this.fb.group({
      username: [customer.username, Validators.required],
      firstName: [customer.firstName, Validators.required],
      lastName: [customer.lastName, Validators.required],
      email: [customer.email, [Validators.required, Validators.email]],
      birthdate: [customer.birthdate],
      address: [customer.address],
      city: [customer.city],
      state: [customer.state, Validators.required],
      zip: [customer.zip]
    });
  }
}