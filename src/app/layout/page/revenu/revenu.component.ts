import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../../../Api/models/breadcrumbitem';
import { BreadcrumbService } from '../../../Api/services/breadcrumb.service';
import { VenteService } from '../../../Api/services/vente.service';
import { Vente } from '../../../Api/models/vente';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-revenu',
  templateUrl: './revenu.component.html',
  styleUrl: './revenu.component.css',
  providers: [MessageService],
})
export class RevenuComponent implements OnInit {
  revenus: Vente[] = [];
  revenu: Vente = { montant: 0, description: '' };
  visible: boolean = false;
  addSuccess: boolean = false;
  code: string = '';
  icon: string = '';

  constructor(
    private breadcrumbService: BreadcrumbService,
    private service: VenteService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', url: '/' },
      { label: 'Revenus', url: '/layout/revenu' },
    ];
    this.breadcrumbService.updateBreadcrumbs(breadcrumbs);
    this.breadcrumbService.updateText('Revenus');
    this.getRevenus();
  }

  getRevenus() {
    this.service.getAllVentes().subscribe((data) => {
      this.revenus = data;
    });
  }

  addRevenu() {
    this.service.validateVente(this.revenu).subscribe((data) => {
      this.changeDetectorRef.detectChanges();
    });
    this.visible = false;

    this.show();
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Revenu ajouté avec succès',
    });
  }

  showDialog() {
    this.visible = true;
  }

  color(id: number): string {
    if (id % 2 == 0) {
      this.code = 'fw-bold text-success py-1';
      this.icon = 'svg-icon success me-5';
      return 'd-flex align-items-center bg-light-success rounded p-5 mb-6';
    } else {
      this.code = 'fw-bold text-warning py-1';
      this.icon = 'svg-icon warning me-5';
    }
    return 'd-flex align-items-center bg-light-warning rounded p-5 mb-6';
  }
}
