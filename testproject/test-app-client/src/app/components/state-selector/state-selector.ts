import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { STATES } from '../../constants/states';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-state-selector',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  templateUrl: './state-selector.html',
  styleUrl: './state-selector.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StateSelector),
      multi: true
    }
  ]
})
export class StateSelector implements ControlValueAccessor {
  states = STATES;

  stateControl = new FormControl('');
  filteredStates!: Observable<{ code: string; name: string }[]>;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.filteredStates = this.stateControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterStates(value || ''))
    );
  }

  writeValue(value: string): void {
    const state = this.states.find(s => s.code === value);
    this.stateControl.setValue(state ? state.name : '', { emitEvent: false });
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  selectState(state: { code: string; name: string }) {
    this.stateControl.setValue(state.name, { emitEvent: false });
    this.onChange(state.code);
    this.onTouched();
  }

  selectFirstFilteredState() {
    const typedValue = this.stateControl.value || '';
    const matches = this.filterStates(typedValue);

    if (matches.length > 0) {
      this.selectState(matches[0]);
    }
  }

  handleBlur() {
    this.onTouched();
  }

  private filterStates(value: string) {
    const search = value.toLowerCase();

    return this.states.filter(state =>
      state.name.toLowerCase().includes(search) ||
      state.code.toLowerCase().includes(search)
    );
  }
}