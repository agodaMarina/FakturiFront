import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../../../../Api/models/breadcrumbitem';
import { BreadcrumbService } from '../../../../Api/services/breadcrumb.service';
import { AchatService } from '../../../../Api/services/achat.service';
import { Achat } from '../../../../Api/models/achat';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{
 depense:Achat = {};
 comptedate:number = 0;

  constructor(private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private service:AchatService
  ) {}

  ngOnInit(): void {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', url: '/' },
      { label: 'Dépense', url: '/layout/depenses' },
      { label: 'Détail', url: '/layout/detail' },
    ];
    this.breadcrumbService.updateBreadcrumbs(breadcrumbs);
    this.breadcrumbService.updateText('Détails');

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getDepense(+id);
    }
  }

  getDepense(id:number){
    this.service.findAchat(id).subscribe({
      next: (res) => {
        this.depense = res;
      },
      error: (err) => {
        console.error(err);
      },
    }); 
    
  
  }

  getImageUrl(depense:Achat): string {
    return `assets/images/${this.depense.image?.name}`;
  }

  getDueDateCountdown(date: string){
    const dueDate = new Date(date);
    console.log(dueDate);
    const currentDate = new Date();
    console.log(currentDate);
    const diff = dueDate.getTime() - currentDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
   
  }

}
