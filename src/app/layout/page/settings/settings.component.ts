import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../../../Api/models/breadcrumbitem';
import { BreadcrumbService } from '../../../Api/services/breadcrumb.service';
import { AuthService } from '../../../Api/services/auth.service';
import { User } from '../../../Api/models/user';
import { AchatService } from '../../../Api/services/achat.service';
import { VenteService } from '../../../Api/services/vente.service';
import { CategorieService } from '../../../Api/services/categorie.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  user: User = {};
   revenuCount = 0;
     achatCount = 0;
     categorieCount = 0;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private authSerice: AuthService,
    private achatService: AchatService,
    private revenuService: VenteService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', url: '/' },
      { label: 'Paramètres', url: '/layout/setting' },
    ];
    this.breadcrumbService.updateBreadcrumbs(breadcrumbs);
    this.breadcrumbService.updateText('Paramètres');

    this.getProfile();
    this.getCounts();
  }

  getProfile() {
    this.authSerice.getProfile().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  
  getCounts()  {
    
    // Get the count of revenu
     this.revenuService.getAllVentes().subscribe({
        next: (res) => {
          this.revenuCount = res.length;
        },
        error: (err) => {
          console.error(err);
        },
      });
  
      // Get the count of achat
      this.achatService.getAchats().subscribe({
        next: (res) => {
          this.achatCount = res.length;
        },
        error: (err) => {
          console.error(err);
        },
      });
  
      // Get the count of categorie
      this.categorieService.getCategories().subscribe({
        next: (res) => {
          this.categorieCount = res.length;
        },
        error: (err) => {
          console.error(err);
        },
      });
  
      
    }
  
  

}
