import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, MatButtonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true
})
export class Navbar {
  authService = inject(AuthService)
  router = inject(Router)

  logout() {
    this.authService.logout().subscribe(()=>{
      this.router.navigateByUrl('/login').then();
    });
  }
}
