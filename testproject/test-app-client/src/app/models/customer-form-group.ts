import { FormControl, FormGroup } from '@angular/forms';

export interface CustomerFormControls {
  username: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  birthdate: FormControl<Date | null>;
  address: FormControl<string>;
  city: FormControl<string>;
  state: FormControl<string>;
  zip: FormControl<string>;
}

export type CustomerFormGroup = FormGroup<CustomerFormControls>;