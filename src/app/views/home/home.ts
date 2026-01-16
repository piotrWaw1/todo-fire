import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderCircle, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, RouterLink, LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})
export class Home {
  authService = inject(AuthService)

  protected readonly LoaderCircle = LoaderCircle;
}
