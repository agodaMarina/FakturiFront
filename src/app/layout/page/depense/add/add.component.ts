import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../../../../Api/models/breadcrumbitem';
import { BreadcrumbService } from '../../../../Api/services/breadcrumb.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Achat } from '../../../../Api/models/achat';
import { AchatService } from '../../../../Api/services/achat.service';
import { Categorie } from '../../../../Api/models/categorie';
import { CategorieService } from '../../../../Api/services/categorie.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  providers: [MessageService],
})
export class AddComponent implements OnInit {
  categories: Categorie[] = [];
  file: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  factureForm: FormGroup;
  image: ImageData | null = null;
  loading: boolean = true;
  fournisseur: string = '';
  dateEcheance: string = '';
  statut: boolean = true;
  tva: number = 0;
  totaltva: number = 0;
  totalttc: number = 0;
  facture!: Achat;
  total: number = 0;
  categorie: Categorie = {};
  succes: boolean = false;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
    private service: AchatService,
    private categorieService: CategorieService,
    private messageService: MessageService
  ) {
    this.factureForm = this.fb.group({
      fournisseur: [''],
      dateEcheance: [''],
      statut: [true],
      tva: [0],
      categorie: [null, Validators.required],
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
      { label: 'ajout', url: '/layout/add' },
    ];
    this.breadcrumbService.updateBreadcrumbs(breadcrumbs);
    this.breadcrumbService.updateText('Ajouter Une Dépense');
    this.getCategories();
  }
  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'succès',
      detail: 'Vous avez ajouté une dépense avec succès',
    });
  }

  onSubmit(): void {
    this.dateEcheance = this.factureForm.get('dateEcheance')?.value;
    this.fournisseur = this.factureForm.get('fournisseur')?.value;
    this.statut = this.factureForm.get('statut')?.value;
    this.tva = this.factureForm.get('tva')?.value;
    this.categorie = this.factureForm.get('categorie')?.value;
    this.totaltva = this.factureForm.get('totaltva')?.value;
    this.totalttc = this.factureForm.get('totalttc')?.value;

    this.facture = {
      fournisseur: this.fournisseur,
      dateEcheance: this.dateEcheance,
      statut: this.statut,
      tva: this.tva,
      totaltva: this.totaltva,
      categorie: this.categorie,
      totalttc: this.totalttc,
    };
    if (this.file)
      this.service.createAchat(this.facture, this.file).subscribe({
        next: (res) => {
          this.facture = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
    this.show();
    this.factureForm.reset();
  }

  //categorie
  visible: boolean = false;
  categorieForm: Categorie = { libelle: '' };

  showDialog() {
    this.visible = true;
  }

  saveCategorie() {
    this.categorieService.createCategorie(this.categorieForm).subscribe({
      next: (data) => {
        this.categories.push(data);
        this.visible = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCategories() {
    this.categorieService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
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
}
