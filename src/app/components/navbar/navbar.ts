import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth/auth.service';
import { LogOut, LucideAngularModule } from 'lucide-angular'
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, MatButtonModule, RouterLink, LucideAngularModule, MatTooltipModule, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true
})
export class Navbar  {
  authService = inject(AuthService)
  router = inject(Router)

  readonly LogOut = LogOut

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login').then();
    });
  }
}
