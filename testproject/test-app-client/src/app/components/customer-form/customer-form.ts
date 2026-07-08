import { Component, input } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { CustomerFormGroup } from '../../models/customer-form-group';
import { StateSelector } from '../state-selector/state-selector';
import { ValidationError } from '../validation-error/validation-error';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-customer-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StateSelector,
    ValidationError
  ],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css'
})
export class CustomerForm {
  form = input.required<CustomerFormGroup>();

}