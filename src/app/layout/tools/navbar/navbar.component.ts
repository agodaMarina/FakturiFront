import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../Api/services/breadcrumb.service';
import { BreadcrumbItem } from '../../../Api/models/breadcrumbitem';
import { AuthService } from '../../../Api/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../Api/services/token.service';
import { User } from '../../../Api/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [];
  user: User={};

  dynamicText: string = '';
  constructor(
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService
  ) {
    this.breadcrumbService.breadcrumbs$.subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
    });

    this.breadcrumbService.text$.subscribe((text) => {
      this.dynamicText = text;
    });
  }
  ngOnInit(): void {
    this.getUser();
  }

  onLogout() {
    this.authService.logout().subscribe(
      (response) => {
        // Suppression du token
        this.tokenService.removeToken();

        // Redirection vers la page de connexion
        this.router.navigate(['/login']); // Remplacez '/login' par le chemin de votre route de connexion
      },
      (error) => {
        console.error('Erreur lors de la déconnexion', error);
      }
    );
  }

  getUser() {
    this.authService.getProfile().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
