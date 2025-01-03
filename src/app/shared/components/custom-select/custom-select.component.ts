import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  Validator,
} from '@angular/forms';
import { CountryCode } from '../../models/country-code.model';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements ControlValueAccessor, Validator {
  @Input() options: CountryCode[] = [];
  @Input() selectCountry: string = '';
  @Input() requiredError: string = '';

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

  onSelectionChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.value = selectedValue;
    this.onChange(selectedValue);
    this.onTouched();
  }
}
