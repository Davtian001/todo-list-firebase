import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordConfirm(controlSrc: AbstractControl): ValidatorFn {
    return function(control: AbstractControl): ValidationErrors | null {
        return control.value === controlSrc.value ? null : {passwordConfirm: {message: 'Passwords do not match'}}
    }
}
