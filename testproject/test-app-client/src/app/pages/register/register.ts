import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

import { CustomerService } from '../../services/customer.service';
import { CustomerForm } from '../../services/customer-form';

import { CustomerForm as CustomerFormComponent } from '../../components/customer-form/customer-form';
import { PasswordField } from '../../components/password-field/password-field';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CustomerFormComponent,
    PasswordField,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  form: any;
  passwordControl = new FormControl('', Validators.required);

  message = '';

  constructor(
    private customerService: CustomerService,
    private customerFormService: CustomerForm,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.customerFormService.createForm();
  }

  registerCustomer() {
    if (this.form.invalid || this.passwordControl.invalid) {
      this.message = 'Please fill out all required fields correctly.';
      this.cdr.detectChanges();
      return;
    }

    const request = {
      ...this.form.value,
      password: this.passwordControl.value || ''
    };

    this.customerService.register(request).subscribe({
      next: (response) => {
        this.message = `Customer registered successfully. ID: ${response.id}`;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.message = error.error || 'Registration failed.';
        this.cdr.detectChanges();
      }
    });
  }
}