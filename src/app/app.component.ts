import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { COUNTRY_CODES } from './shared/constants/country-codes';
import { MAX_PHONES } from './shared/constants/max-phones';
import { VALIDATION_PATTERNS } from './shared/constants/validation-patterns';
import { CountryCode } from './shared/models/country-code.model';
import { notEmptyValidator } from './shared/validators/not-empty.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userForm!: FormGroup;
  countryCodes: CountryCode[] = COUNTRY_CODES;

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(2), notEmptyValidator()],
      ],
      surname: [
        '',
        [Validators.required, Validators.minLength(2), notEmptyValidator()],
      ],
      email: ['', [Validators.required, Validators.email]],
      phones: this.fb.array([]),
    });

    this.addPhone();
  }

  get phones() {
    return this.userForm.get('phones') as FormArray;
  }

  addPhone() {
    if (this.phones.length < MAX_PHONES) {
      this.phones.push(
        this.fb.group({
          countryCode: ['', Validators.required],
          number: [
            '',
            [
              Validators.required,
              Validators.pattern(VALIDATION_PATTERNS.PHONE_NUMBER),
            ],
          ],
        })
      );
    }
  }
  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.markFormGroupTouched(this.userForm);
    } else {
      console.log(this.userForm.value);
      this.userForm.reset();
    }
  }
}
