import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { skipUntil } from 'rxjs';
import { AuthService } from '../../Api/services/auth.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.css'
})
export class ActivationComponent {
  message = '';
  isOkay = true;
  submitted = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  private confirmAccount(token: string) {
    this.authService.activateAccount(
      token
    ).subscribe({
      next: () => {
        this.message = 'Votre compte a été bien activé.\nMaintenant vous pouvez vous connecter';
        this.submitted = true;
      },
      error: () => {
        this.message = 'le Token a expiré ou est invalide. Veuillez réessayer';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  protected readonly skipUntil = skipUntil;
}
