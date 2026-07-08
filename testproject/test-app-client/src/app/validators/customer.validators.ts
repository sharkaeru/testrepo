import { Validators } from '@angular/forms';

export class CustomerValidators {

  static readonly username = [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50)
  ];

  static readonly firstName = [
    Validators.required,
    Validators.maxLength(100)
  ];

  static readonly lastName = [
    Validators.required,
    Validators.maxLength(100)
  ];

  static readonly email = [
    Validators.required,
    Validators.email,
    Validators.maxLength(255)
  ];

  static readonly state = [
    Validators.required
  ];

  static readonly password = [
    Validators.required,
    Validators.minLength(8)
  ];
}