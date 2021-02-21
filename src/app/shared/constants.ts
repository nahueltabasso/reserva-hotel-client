import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

// EXPRESIONES REGULARES 
export const PATTERN_ONLYLETTERS = '^[a-zA-Z\s]*$';
export const PATTERN_ONLYNUMBER = '^[0-9]*$';

export const MIN_DNI = 10000000;
export const MAX_DNI = 100000000;

export const validEqualsPasswords: ValidatorFn = (
    control: FormGroup
): ValidationErrors | null => {
    const password = control.get("password");
    const confirmPassword = control.get("passwordConfirm");

    return password.value === confirmPassword.value ? null : { notEquals: true }
}