import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbItem } from '../../../Api/models/breadcrumbitem';
import { BreadcrumbService } from '../../../Api/services/breadcrumb.service';
import { Chart, registerables } from 'chart.js';
import { Rapport } from '../../../Api/models/rapport';
import { RapportService } from '../../../Api/services/rapport.service';
import { Historique } from '../../../Api/models/historique';
import { VenteService } from '../../../Api/services/vente.service';
import { AchatService } from '../../../Api/services/achat.service';
import { SoldeService } from '../../../Api/services/solde.service';
import { Solde } from '../../../Api/models/solde';
Chart.register(...registerables);
@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.css',
})
export class RapportComponent implements OnInit,AfterViewInit {
  weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  // Calculate the current month dates based on a starting date
  currentMonthDates = this.calculateDates(new Date());
  // Get today's date
  today = new Date();
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  rapportData$: Rapport | undefined;
  chart: any = null;
  categories = ['Alimentation', 'Logement', 'Loisirs', 'Transport'];
  montants = [250, 500, 150, 100]; // Exemple de données, remplacez par vos données réelles
  historiques:Historique[] = [];
  couleur:string="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success";
  solde: Solde={};

  totalAchat:number = 0;
  totalVente:number = 0;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private rapportService: RapportService,
    private venteService: VenteService,
    private achatService: AchatService,
    private soldeService: SoldeService
  ) {}
  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnInit(): void {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', url: '/' },
      { label: 'Rapports', url: '/layout/rapport' },
    ];
    this.breadcrumbService.updateBreadcrumbs(breadcrumbs);
    this.breadcrumbService.updateText('Consulter les rapports');
    this.getVenteTotal();
    this.getAchatTotal();
    this.getSolde();
  }

  // Method to calculate the dates of the current week
  calculateDates(startDate: Date): number[] {
    const startDay = startDate.getDate();
    return Array.from(
      { length: 7 },
      (_, i) => startDay - (startDate.getDay() - i)
    );
  }

  //recupérer l'historique des transactions
  getHistorique():void{
    this.rapportService.getHistorique().subscribe((data) => {
      this.historiques = data;
    });
  }

  // Check if a date is the current date
  isCurrentDate(index: number): boolean {
    return this.today.getDate() === this.currentMonthDates[index];
  }

  getRapportData(year: number, month: number): void {
    this.rapportService.getMonthlyReportData(year, month).subscribe((data) => {
      this.rapportData$ = data;
      this.createChart();
    });
  }
  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }
    this.chart = new Chart(ctx, 
      {
      type: 'doughnut',
      data: {
        labels: ['Alimentation', 'Divers', 'Santé','Logement'],
        datasets: [
          {
            label: 'Categorie',
            data: [50, 20, 10,10],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
            ],
            hoverOffset: 4,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,

          },
        },
      },
    });
  }


  getAchatTotal(){
    this.achatService.getAchats().subscribe((data)=>{
      let total = 0;
      data.forEach((achat)=>{
        if (achat && achat.totalttc) {
          this.totalAchat += achat.totalttc;
        }
      })
     
    })
  }

  getVenteTotal(){
    this.venteService.getAllVentes().subscribe((data)=>{
      let total = 0;
      data.forEach((vente)=>{
        if (vente && vente.montant) {
          this.totalVente += vente.montant;
        }
      })
      
    })
  }


  getSolde(){
    this.soldeService.getSoldeActuel().subscribe((data)=>{
      this.solde = data;
    }
  )
}

}