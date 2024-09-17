import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis } from 'ng-apexcharts';
import { DashboardServiceService } from '../dashboard-service.service';

@Component({
  selector: 'app-admin-dashboard',
 
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent  implements OnInit {
  totalOffres: number = 0;
  totalCandidatures: number = 0;
  totalUsers: number = 0;

  // Données pour les graphiques
  offresParUtilisateurSeries: ApexAxisChartSeries = [];
  offresParUtilisateurChart: ApexChart = { type: 'bar' };
  offresParUtilisateurLabels: string[] = [];

  candidaturesParOffreSeries: ApexAxisChartSeries = [];
  candidaturesParOffreChart: ApexChart = { type: 'bar' };
  candidaturesParOffreLabels: string[] = [];

  constructor(private dashboardService: DashboardServiceService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getTotalOffres().subscribe(data => {
      this.totalOffres = data;
    });

    this.dashboardService.getTotalCandidatures().subscribe(data => {
      this.totalCandidatures = data;
    });

    this.dashboardService.getTotalUsers().subscribe(data => {
      this.totalUsers = data;
    });

    this.dashboardService.getOffresParUtilisateur().subscribe(data => {
      this.offresParUtilisateurLabels = Object.keys(data);
      this.offresParUtilisateurSeries = [{ name: 'Offres', data: Object.values(data) }];
    });

    this.dashboardService.getCandidaturesParOffre().subscribe(data => {
      this.candidaturesParOffreLabels = Object.keys(data);
      this.candidaturesParOffreSeries = [{ name: 'Candidatures', data: Object.values(data) }];
    });
  }
}