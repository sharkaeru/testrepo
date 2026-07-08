import { Injectable } from '@angular/core';
import { CustomerResponse } from '../models/customer-response';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private storageKey = 'loggedInCustomer';

  setCurrentCustomer(customer: CustomerResponse): void {
    localStorage.setItem(this.storageKey, JSON.stringify(customer));
  }

  getCurrentCustomer(): CustomerResponse | null {
    const storedCustomer = localStorage.getItem(this.storageKey);

    if (!storedCustomer) {
      return null;
    }

    return JSON.parse(storedCustomer) as CustomerResponse;
  }

  isLoggedIn(): boolean {
    return this.getCurrentCustomer() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }
}