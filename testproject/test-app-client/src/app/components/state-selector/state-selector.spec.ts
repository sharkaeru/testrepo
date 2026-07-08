import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateSelector } from './state-selector';

describe('StateSelector', () => {
  let component: StateSelector;
  let fixture: ComponentFixture<StateSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(StateSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
