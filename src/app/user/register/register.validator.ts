import {FormControl, ValidatorFn} from "@angular/forms";

export function registerValidator(otherControlName: string): ValidatorFn {

  let thisControl: FormControl;
  let otherControl: FormControl;

  return (control: FormControl) => {
    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!thisControl) {
      thisControl = control;
      otherControl = control.parent.get(otherControlName) as FormControl;
      if (!otherControl) {
        throw new Error('matchOtherValidator(): other control is not found in parent group');
      }
      otherControl.valueChanges.subscribe(() => {
        thisControl.updateValueAndValidity();
      });
    }

    if (!otherControl) {
      return null;
    }

    if (otherControl.value !== thisControl.value) {
      return {
        matches: true
      };
    }

    return null;
  };
}
