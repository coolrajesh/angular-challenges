import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validator to check if two fields match.
 * @param controlName - The name of the first field.
 * @param matchingControlName - The name of the second field to match.
 * @returns A validation function that ensures the two fields match.
 */
export function MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);

        if (!control || !matchingControl) {
            return null; // If controls don't exist, return null (no error)
        }

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            return null; // Return if another validator already found an error
        }

        // Check if values are different
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }

        return null;
    };
}
