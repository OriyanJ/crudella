import { FormControl } from '@angular/forms';

/**
 * Make sure the value has something other than whitespaces.
 */
export function noWhitespaceValidator(control: FormControl) {
  if (!control.value) {
    return;
  }
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}

/**
 * Make sure value is numeric.
 */
export function numeric(control: FormControl) {
  if (!control.value) {
    return;
  }
  const regex = /^[0-9]*$/;
  const isValid = regex.test(control.value);
  return isValid ? null : { numeric: true };
}
