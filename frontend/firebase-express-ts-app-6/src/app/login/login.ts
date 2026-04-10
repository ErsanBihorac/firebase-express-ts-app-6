import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(AuthService);
  router = inject(Router);

  async onAnonymousLogin() {
    const user = await this.authService.signinAnonymously();
    if (!user) throw new Error('Could not receive user from anonymouse sign in');

    this.router.navigate(['/']);
  }
}
