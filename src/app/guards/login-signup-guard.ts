import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const loginSignupGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(user => {
      if (user) {
        const homePath = router.parseUrl("/todos");

        return new RedirectCommand(homePath)
      }
      return true
    })
  )
};
