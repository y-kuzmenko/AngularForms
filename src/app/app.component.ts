import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

export function notEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isEmpty = control.value == null || control.value.toString().trim() === '';
    return isEmpty ? {'notEmpty': true} : null;
  };
}
interface CountryCode {
  code: string;
  dial_code: string;
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userForm!: FormGroup;

  countryCodes: CountryCode[] = [
    { code: 'US', dial_code: '+1', name: 'United States' },
    { code: 'GB', dial_code: '+44', name: 'United Kingdom' },
    { code: 'RU', dial_code: '+7', name: 'Russia' },
    { code: 'AU', dial_code: '+61', name: 'Australia' },
    { code: 'AT', dial_code: '+43', name: 'Austria' },
    { code: 'AZ', dial_code: '+994', name: 'Azerbaijan' },
    { code: 'AL', dial_code: '+355', name: 'Albania' },
    { code: 'DZ', dial_code: '+213', name: 'Algeria' },
    { code: 'AS', dial_code: '+1-684', name: 'American Samoa' },
    { code: 'AI', dial_code: '+1-264', name: 'Anguilla' },
    { code: 'AO', dial_code: '+244', name: 'Angola' },
    { code: 'AD', dial_code: '+376', name: 'Andorra' },
    { code: 'AG', dial_code: '+1-268', name: 'Antigua and Barbuda' },
    { code: 'AR', dial_code: '+54', name: 'Argentina' },
    { code: 'AM', dial_code: '+374', name: 'Armenia' },
    { code: 'AW', dial_code: '+297', name: 'Aruba' },
    { code: 'AF', dial_code: '+93', name: 'Afghanistan' },
    { code: 'BS', dial_code: '+1-242', name: 'Bahamas' },
    { code: 'BD', dial_code: '+880', name: 'Bangladesh' },
    { code: 'BB', dial_code: '+1-246', name: 'Barbados' },
    { code: 'BH', dial_code: '+973', name: 'Bahrain' },
    { code: 'BY', dial_code: '+375', name: 'Belarus' },
    { code: 'BZ', dial_code: '+501', name: 'Belize' },
    { code: 'BE', dial_code: '+32', name: 'Belgium' },
    { code: 'BJ', dial_code: '+229', name: 'Benin' },
  ];

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength, notEmptyValidator()]],
      surname: ['', [Validators.required, Validators.minLength, notEmptyValidator()]],
      email: ['', [Validators.required, Validators.email]],
      phones: this.fb.array([]),
    });

    this.addPhone();
  }

  get phones() {
    return this.userForm.get('phones') as FormArray;
  }

  addPhone() {
    if (this.phones.length < 3) {
      this.phones.push(
        this.fb.group({
          countryCode: ['', Validators.required],
          number: [
            '',
            [Validators.required, Validators.pattern('^[0-9]{5,15}$')],
          ],
        })
      );
    }
  }
  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.userForm.reset();
    }
  }
}
