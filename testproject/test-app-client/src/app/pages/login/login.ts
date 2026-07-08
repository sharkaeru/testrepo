import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginCustomerRequest } from '../../models/login-customer-request';
import { CustomerResponse } from '../../models/customer-response';
import { AuthApi } from '../../services/auth-api';
import { Auth } from '../../services/auth';

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
  private authApi: AuthApi,
  private auth: Auth,
  private cdr: ChangeDetectorRef
) {}

  loginCustomer() {
    this.authApi.login(this.loginRequest).subscribe({
      next: (customer: CustomerResponse) => {
        this.auth.setCurrentCustomer(customer);
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