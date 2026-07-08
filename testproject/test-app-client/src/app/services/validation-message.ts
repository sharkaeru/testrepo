import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

type ValidationMessageFactory = (error: unknown) => string;

@Injectable({
  providedIn: 'root'
})
export class ValidationMessage {
  private readonly messages: Record<string, ValidationMessageFactory> = {
    required: () => 'This field is required.',

    email: () => 'Please enter a valid email address.',

    minlength: (error: any) =>
      `Minimum length is ${error.requiredLength}.`,

    maxlength: (error: any) =>
      `Maximum length is ${error.requiredLength}.`
  };

  getMessage(control: AbstractControl | null): string {
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    return this.getFirstErrorMessage(control.errors);
  }

  private getFirstErrorMessage(errors: ValidationErrors): string {
    const firstErrorKey = Object.keys(errors)[0];

    if (!firstErrorKey) {
      return '';
    }

    const messageFactory = this.messages[firstErrorKey];

    if (!messageFactory) {
      return 'Invalid value.';
    }

    return messageFactory(errors[firstErrorKey]);
  }
}