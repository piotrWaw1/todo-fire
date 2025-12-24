import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  standalone: true
})
export class ErrorMessagePipe implements PipeTransform {

  transform(errors: ValidationErrors | null | undefined): string {
    if (!errors) {
      return ''
    }
    if (errors['required']) return 'This field is required';
    if (errors['email']) return 'Invalid email format';
    if (errors['minlength']) return `Password must match at least ${errors['minlength'].requiredLength}`;
    if (errors['mismatch']) return 'Passwords do not match';

    return 'Invalid value';
  }

}
