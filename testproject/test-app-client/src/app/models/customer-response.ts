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