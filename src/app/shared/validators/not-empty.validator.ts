import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

export function notEmptyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isEmpty = control.value == null || control.value.toString().trim() === '';
      return isEmpty ? {'notEmpty': true} : null;
    };
  }