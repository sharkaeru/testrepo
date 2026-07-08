import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ValidationMessage } from '../../services/validation-message';

@Component({
  selector: 'app-validation-error',
  imports: [],
  templateUrl: './validation-error.html',
  styleUrl: './validation-error.css',
})
export class ValidationError {
  control = input.required<AbstractControl>();

  constructor(
    private validationMessage: ValidationMessage
  ) {}

  get message(): string {
    return this.validationMessage.getMessage(this.control());
  }
}