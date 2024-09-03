import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../../../Api/models/breadcrumbitem';
import { BreadcrumbService } from '../../../Api/services/breadcrumb.service';
import { AuthService } from '../../../Api/services/auth.service';
import { SoldeService } from '../../../Api/services/solde.service';
import { Solde } from '../../../Api/models/solde';
import { AchatService } from '../../../Api/services/achat.service';
import { CategorieService } from '../../../Api/services/categorie.service';
import { VenteService } from '../../../Api/services/vente.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  solde:Solde = {};
  circleclass:string="";
  texte:string=" ";
  depense:number=0;
  revenu:number=0;
  categorie:number=0;
  alert: boolean = false;

 
  constructor(
    private breadcrumbService: BreadcrumbService,
    private service: SoldeService,
    private achatservice:AchatService,
    private catService:CategorieService,
    private revenuService:VenteService
  ) {}

  ngOnInit(): void {
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Accueil', url: '/' }];
    this.breadcrumbService.updateBreadcrumbs(breadcrumbs);
    this.breadcrumbService.updateText('Bienvenue sur Fakturi');
    this.getSolde();
    this.getstats();
  }

  getSolde() {
    this.service.getSoldeActuel().subscribe({
      next: (res) => {
        this.solde = res;
        if (this.solde.solde !== undefined && this.solde.soldeCritique !== undefined && this.solde.solde <= this.solde.soldeCritique) {
          this.circleclass="balance-circle low-balance";
          this.texte=" Attention! Solde critique";
          this.alert = true;
        } else {
          this.circleclass="balance-circle";
          this.texte="votre solde est au dessus du plafond critique";
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getstats(){
    this.achatservice.getAchats().subscribe({
      next: (res) => {
        this.depense = res.length;
      }});

    this.revenuService.getAllVentes().subscribe({
      next: (res) => {
        this.revenu = res.length;
      }});

    this.catService.getCategories().subscribe({
      next: (res) => {
        this.categorie = res.length;
      }});

  }
}

