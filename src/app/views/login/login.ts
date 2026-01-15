import { Component, inject, signal } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ErrorMessagePipe } from '../../pipe/error-message-pipe';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LucideAngularModule, LoaderCircle } from 'lucide-angular';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    ErrorMessagePipe,
    LucideAngularModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true
})
export class Login {
  errorMessage = signal<string | null>(null)

  readonly LoaderCircle = LoaderCircle

  fb = inject(NonNullableFormBuilder)
  authService = inject(AuthService)
  router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  onSubmit() {
    const formValue = this.loginForm.getRawValue()

    this.authService.isPending.set(true)

    this.authService.login(formValue.email, formValue.password)
      .pipe(
        finalize(() => this.authService.isPending.set(false))
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
