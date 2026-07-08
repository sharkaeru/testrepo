import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CustomerResponse } from '../models/customer-response';
import { LoginCustomerRequest } from '../models/login-customer-request';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {
  private apiUrl = 'https://localhost:7129/api/customers';

  constructor(private http: HttpClient) {}

  login(request: LoginCustomerRequest): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(`${this.apiUrl}/login`, request);
  }
}