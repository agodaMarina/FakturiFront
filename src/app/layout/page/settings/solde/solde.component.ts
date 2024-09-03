import { Component, OnInit } from '@angular/core';
import { Solde } from '../../../../Api/models/solde';
import { SoldeService } from '../../../../Api/services/solde.service';
import { RapportService } from '../../../../Api/services/rapport.service';
import { Historique } from '../../../../Api/models/historique';

@Component({
  selector: 'app-solde',
  templateUrl: './solde.component.html',
  styleUrl: './solde.component.css'
})
export class SoldeComponent implements OnInit {
  solde:Solde={};
  montant:number = 0;
  historiques:Historique[] = [];

  constructor(private service:SoldeService) { }

  ngOnInit(): void {
    this.getSolde();
    this.getHistorique();
  }

  getSolde() {
    this.service.getSoldeActuel().subscribe(
      (data)=>{
        this.solde = data;
      }
    )
  }

  getHistorique() {
    this.service.getHistorique().subscribe(
      (data)=>{
        for(let i = 0 ; i < 9 ; i++) {
        this.historiques = data;
      }}
    )
  }

  updateSolde() {
    this.service.updateSolde(this.solde,this.montant).subscribe(
      (data)=>{
        this.solde = data;
      }
    )
    this.getSolde();
  }


  
}
