import { Routes } from '@angular/router';
import { loginSignupGuard } from './guards/login-signup-guard';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Home } from './views/home/home';

export const routes: Routes = [
  {
    path: "",
    component: Home,
    title: "Home",
    pathMatch: "full",
  },
  {
    path: 'login',
    loadComponent: ()=> import('./views/login/login').then(m => m.Login),
    title: "Login",
    canActivate: [loginSignupGuard],
  },
  {
    path: 'signup',
    loadComponent: ()=>import('./views/signup/signup').then(m => m.Signup),
    title: "Signup",
    canActivate: [loginSignupGuard],
  },
  {
    path: 'todos',
    loadComponent: () => import('./views/todos/todos').then((m) => m.Todos),
    title: "Todos",
    ...canActivate(() => redirectUnauthorizedTo(['login']))
  }
];
