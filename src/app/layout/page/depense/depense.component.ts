import { Component, OnInit } from '@angular/core';
import { AchatService } from '../../../Api/services/achat.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Achat } from '../../../Api/models/achat';
import { ImageData } from '../../../Api/models/image-data';
import { BreadcrumbService } from '../../../Api/services/breadcrumb.service';
import { BreadcrumbItem } from '../../../Api/models/breadcrumbitem';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrl: './depense.component.css',
  providers: [MessageService],
})
export class DepenseComponent implements OnInit {
  file: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  factureForm: FormGroup;
  image: ImageData | null = null;
  loading: boolean = true;
  achat: Achat = {};
  class_toast = 'success';
  toast_message = 'nouvelle dépense enregistrée avec succès';
  toast_summary = 'success';
  isModalOpen: boolean = false;
  factures!: Achat[];

  categories: Array<any> = [];
  numero: string = '';
  fournisseur: string = '';
  dateEcheance: string = '';
  dateEmission: string = '';
  statut: boolean = true;
  tva: number = 0;
  totaltva: number = 0;
  totalttc: number = 0;
  facture!: Achat;
  total: number = 0;
  idToDelete!: number;
  code: string = '';
  icon: string = '';

  alert: boolean = false;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private service: AchatService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.factureForm = this.fb.group({
      dateEcheance: [''], // dateEcheance
      dateEmission: [''], // dateEmission
      statut: [true],
      fournisseur: [''],
      numero: [''],
      tva: [0],
      totalht: [0],
      totaltva: [{ value: 0, disabled: true }],
      totalttc: [{ value: 0, disabled: true }],
    });

    this.onChanges();
  }

  ngOnInit(): void {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', url: '/' },
      { label: 'Dépense', url: '/layout/depenses' },
    ];
    this.breadcrumbService.updateBreadcrumbs(breadcrumbs);
    this.breadcrumbService.updateText('Gérer Vos Dépenses');
    this.getAllDepense();
  }

  addFacture() {
    this.router.navigate(['/layout/add-depense']);
  }

  getAllDepense() {
    this.service.getAchats().subscribe({
      next: (data: Achat[]) => {
        this.factures = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  

  color(id:number): string {
    if (id%2 === 0) {
      this.code = 'fw-bold text-info py-1';
     
      return 'd-flex align-items-center bg-light-info rounded p-5 mb-6';
    } else {
      this.code = 'fw-bold text-warning py-1';
     
    }
    return 'd-flex align-items-center bg-light-warning rounded p-5 mb-6';
  }

  /**fonction pour l'icone de la dépense */
  geticon(categorie: string): string {
    if (categorie === 'Alimentation') {
      return 'success';
    } else {
      return 'warning';
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.file);
    }
  }

  loadImage() {
    if (this.file) {
      const formData = new FormData();
      formData.append('image', this.file);
    }
  }

  clearImage(): void {
    this.file = null;
    this.imagePreview = null;
  }

  /**fonction  pour observer les changements de valeur des champs */
  onChanges(): void {
    this.factureForm.get('totalht')?.valueChanges.subscribe((val) => {
      this.updateTotals();
    });

    this.factureForm.get('tva')?.valueChanges.subscribe((val) => {
      this.updateTotals();
    });

    this.factureForm.get('statut')?.valueChanges.subscribe((value) => {
      if (value) {
        this.factureForm.get('dateEcheance')?.disable();
      } else {
        this.factureForm.get('dateEcheance')?.enable();
      }
    });
  }

  /**actualiser les valeurs des totaux automatiquement */
  updateTotals(): void {
    const totalht = this.factureForm.get('totalht')?.value;
    const tva = this.factureForm.get('tva')?.value;
    const statut = this.factureForm.get('statut')?.value;
    if (totalht !== null && tva !== null) {
      const totaltva = totalht * (tva / 100);
      const totalttc = totalht + totaltva;

      this.factureForm.patchValue({
        totaltva: totaltva,
        totalttc: totalttc,
      });
    }
  }

  /**vérifié si le statut est impayé et afficher le champ de la date d'écheance pour le payement " */
  get isStatutImpaye(): boolean {
    return this.factureForm.get('statut')?.value === false;
  }
  /**fonction pour enregistrer une facture  */
  onSubmit(): void {
    this.dateEcheance = this.factureForm.get('dateEcheance')?.value;
    this.dateEmission = this.factureForm.get('dateEmission')?.value;
    this.fournisseur = this.factureForm.get('fournisseur')?.value;
    this.statut = this.factureForm.get('statut')?.value;
    this.numero = this.factureForm.get('numero')?.value;
    this.tva = this.factureForm.get('tva')?.value;
    this.totaltva = this.factureForm.get('totaltva')?.value;
    this.totalttc = this.factureForm.get('totalttc')?.value;

    this.facture = {
      dateEcheance: this.dateEcheance,
      dateEmission: this.dateEmission,
      fournisseur: this.fournisseur,
      statut: this.statut,
      numero: this.numero,
      tva: this.tva,
      totaltva: this.totaltva,
      totalttc: this.totalttc,
    };

    console.log(this.facture);
  }
  show() {
    this.messageService.add({
      severity: this.class_toast,
      summary: this.toast_summary,
      detail: this.toast_message,
    });
  }

  /**recupération de l'id pour la suppression */
  setFactureIdToDelete(id: number | undefined): void {
    if (id !== undefined) {
      this.idToDelete = id;
    } else {
      console.error('ID is undefined');
    }
  }

  /**suppression d'une facture  */
  deleteFacture(): void {
    this.service.delete(this.idToDelete).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllDepense();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  /**fonction pour recupérer une facture parl'id */
  getAchat(id: number) {
    this.service.findAchat(id).subscribe({
      next: (data: Achat) => {
        this.achat = data;
        this.factureForm.patchValue({
          fournisseur: this.achat.fournisseur,
          numero: this.achat.numero,
          tva: this.achat.tva,
          dateEmission: this.achat.dateEmission,
          dateEcheance: this.achat.dateEcheance,
          statut: this.achat.statut,
          totaltva: this.achat.totaltva,
          totalttc: this.achat.totalttc,
        });
        this.image = this.achat.image ? this.achat.image : null;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  /**fonction pour rediriger vers la page de détail d'une facture */
  viewDetails(id: number): void {
    this.router.navigate(['/layout/detail', id]);
  }

  /**fonction pour mettre à jour une facture */
  updateAchat(id: number) {
    this.service.update(this.facture).subscribe({
      next: (data: Achat) => {
        this.facture = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
