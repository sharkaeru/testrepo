import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService, LoginCustomerRequest, CustomerResponse } from '../../services/customer.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginRequest: LoginCustomerRequest = {
    username: '',
    password: ''
  };

  message = '';

  constructor(
  private customerService: CustomerService,
  private cdr: ChangeDetectorRef
) {}

  loginCustomer() {
    this.customerService.login(this.loginRequest).subscribe({
      next: (customer: CustomerResponse) => {
        localStorage.setItem('loggedInCustomer', JSON.stringify(customer));
        this.message = `Welcome, ${customer.firstName}!`;
        this.cdr.detectChanges();
},
      error: () => {
        this.message = 'Invalid username or password.';
        this.cdr.detectChanges();
}
    });
  }
}