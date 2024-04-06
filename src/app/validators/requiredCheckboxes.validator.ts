import { FormGroup, ValidatorFn, ValidationErrors } from "@angular/forms";

export const requiredCheckboxesValidator = (minRequired = 1): ValidatorFn => {
  return (formGroup: any) => {

    const checked = Object.keys(formGroup.controls).reduce((acum,key) => (
      formGroup.controls[key].value === true ? acum+1:acum
    ),0);

    if (checked < minRequired) {
      return {
        requireCheckboxToBeChecked: true,
      };
    }

    return null;
  };
}