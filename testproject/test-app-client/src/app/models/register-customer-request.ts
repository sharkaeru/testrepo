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