import { Component } from '@angular/core';
import { CustomerResponse } from '../../models/customer-response';
import { Auth } from '../../services/auth';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
    MatButtonModule,
    DatePipe,
    RouterLink
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  customer: CustomerResponse | null = null;

  constructor(private auth: Auth) {}

  ngOnInit() {
  this.customer = this.auth.getCurrentCustomer();
}
}