import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CustomerResponse } from '../models/customer-response';
import { CustomerFormData } from '../models/customer-form-data';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7129/api/customers';

  constructor(private http: HttpClient) {}

  register(request: CustomerFormData & { password: string }): Observable<CustomerResponse> {
  return this.http.post<CustomerResponse>(`${this.apiUrl}/register`, request);
  }

  updateCustomer(id: number, request: CustomerFormData): Observable<CustomerResponse> {
    return this.http.put<CustomerResponse>(`${this.apiUrl}/${id}`, request);
  }
}