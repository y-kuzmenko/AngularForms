import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor, Validator {
  @Input() type: string = 'text';
  @Input() requiredError: string = '';
  @Input() minLengthError: string = '';
  @Input() emailError: string = '';
  @Input() notEmptyError: string = '';
  @Input() phoneError: string = '';

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};
  control: any;

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: FormControl) {
    this.control = control;
    return null;
  }
}
