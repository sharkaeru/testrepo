import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomerResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  joinDate: string;
  birthdate?: string | null;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface RegisterCustomerRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate?: string | null;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface LoginCustomerRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7129/api/customers';

  constructor(private http: HttpClient) {}

  register(request: RegisterCustomerRequest): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(`${this.apiUrl}/register`, request);
  }

  login(request: LoginCustomerRequest): Observable<CustomerResponse> {
  return this.http.post<CustomerResponse>(`${this.apiUrl}/login`, request);
}
}