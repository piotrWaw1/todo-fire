import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ErrorMessagePipe } from '../../pipe/error-message-pipe';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { LucideAngularModule, LoaderCircle } from 'lucide-angular';
import { finalize } from 'rxjs';


export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  return control.get("repeatPassword")?.value !== control.get("password")?.value ? { mismatch: true } : null;
}

@Component({
  selector: 'app-signup',
  imports: [
    MatFormFieldModule,
    ErrorMessagePipe,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    LucideAngularModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  standalone: true
})
export class Signup {
  errorMessage = signal<string | null>(null)
  isSubmitting = signal<boolean>(false)

  readonly LoaderCircle = LoaderCircle

  fb = inject(NonNullableFormBuilder)
  router = inject(Router)
  authService = inject(AuthService)


  signUpForm = this.fb.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repeatPassword: ['', [Validators.required]]
  }, { validators: passwordMatchValidator })

  onSubmit() {
    this.isSubmitting.set(true)

    const formValue = this.signUpForm.getRawValue()

    this.authService.signup(formValue.email, formValue.userName, formValue.password)
      .pipe(
        finalize(() => this.isSubmitting.set(false))
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/').then();
        },
        error: (err) => {
          this.errorMessage.set(err.code)
        }
      })
  }
}
