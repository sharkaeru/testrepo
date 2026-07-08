import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { CustomerService } from '../../services/customer.service';
import { CustomerFormService } from '../../services/customer-form';
import { Auth } from '../../services/auth';

import { CustomerFormGroup } from '../../models/customer-form-group';

import { CustomerForm as CustomerFormComponent } from '../../components/customer-form/customer-form';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-profile',
  imports: [
    CustomerFormComponent,
    MatCardModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {
  form: CustomerFormGroup;
  message = '';
  customerId: number | null = null;

  constructor(
    private customerService: CustomerService,
    private customerFormService: CustomerFormService,
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    const customer = this.auth.getCurrentCustomer();

    if (customer) {
      this.customerId = customer.id;
      this.form = this.customerFormService.createFormFromCustomer(customer);
    } else {
      this.form = this.customerFormService.createForm();
      this.message = 'No customer is currently logged in.';
    }
  }

  saveChanges() {
    if (!this.customerId) {
      this.message = 'No customer is currently logged in.';
      this.cdr.detectChanges();
      return;
    }

    if (this.form.invalid) {
      this.message = 'Please fill out all required fields correctly.';
      this.cdr.detectChanges();
      return;
    }

    const formValue = this.form.getRawValue();

    const request = {
      ...formValue,
      birthdate: formValue.birthdate
        ? formValue.birthdate.toISOString().split('T')[0]
        : null
    };

    this.customerService.updateCustomer(this.customerId, request).subscribe({
      next: (updatedCustomer) => {
        this.auth.setCurrentCustomer(updatedCustomer);
        this.message = 'Profile updated successfully.';
        this.cdr.detectChanges();

        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.message = error.error || 'Profile update failed.';
        this.cdr.detectChanges();
      }
    });
  }
}