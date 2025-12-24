import { Routes } from '@angular/router';
import { Login } from './views/login/login';
import { Signup } from './views/signup/signup';
import { loginSignupGuard } from './guards/login-signup-guard';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: "Login",
    canActivate: [loginSignupGuard],
  },
  {
    path: 'signup',
    component: Signup,
    title: "Signup",
    canActivate: [loginSignupGuard],
  },
  {
    path: 'todos',
    loadComponent: () => import('./views/todos/todos').then((m) => m.Todos),
    title: "Todos",
    ...canActivate(() => redirectUnauthorizedTo(['login']))
    // data: { authGuardPipe: redirectUnauthorizedTo(['login']) }
  }
];
