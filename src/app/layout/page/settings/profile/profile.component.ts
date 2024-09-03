import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../../../../Api/models/breadcrumbitem';
import { BreadcrumbService } from '../../../../Api/services/breadcrumb.service';
import { AuthService } from '../../../../Api/services/auth.service';
import { User } from '../../../../Api/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile:User={};

  constructor(private breadcrumbService:BreadcrumbService, private service:AuthService) {}

  ngOnInit(): void {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', url: '/' },
      { label: 'Accueil', url: '/layout/setteing' },
      { label: 'Accueil', url: '/layout/' },
    ];
    this.breadcrumbService.updateBreadcrumbs(breadcrumbs); 
    this.breadcrumbService.updateText('Bienvenue sur Fakturi');

    this.getProfile();
  }

  getProfile() {
    this.service.getProfile().subscribe(
      (data)=>{
        this.profile = data;
      }
    )
  }

}
