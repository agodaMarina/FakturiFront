import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../../../../Api/services/categorie.service';
import { Categorie } from '../../../../Api/models/categorie';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent implements OnInit {
  categories: Categorie[] = [];
  categorie: Categorie={};

  constructor(private service:CategorieService) {}

  ngOnInit(): void {
    this.getCategories();
  }

getCategories() {
  this.service.getCategories().subscribe((data) => {
    this.categories = data;
  });
  
}

addCategorie() {
  this.service.createCategorie(this.categorie).subscribe((data) => {
    this.categories.push(data);
  });
}

deleteCategorie(categorieId: number) {
  this.service.delete(categorieId).subscribe(() => {
    this.categories = this.categories.filter((categorie: Categorie) => categorie.id !== categorieId);
  });

}

}