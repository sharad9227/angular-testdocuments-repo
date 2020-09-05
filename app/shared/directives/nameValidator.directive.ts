import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export const assessmentNameValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const name = control.get('title');
  name.value.replace(/\s+/g, '');
  return name  && name.value.replace(/\s+/g, '').toLowerCase() === 'unnamedtest' ? { 'validated': 'Unnamed Test' } : null;
};

@Directive({
    selector: '[assessmentName]',
    providers: [{ provide: NG_VALIDATORS, useExisting: AssessmentNameValidatorDirective, multi: true }]
  })
  export class AssessmentNameValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors {
      return assessmentNameValidator(control);
    }
  }