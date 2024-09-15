import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatureServiceService } from 'src/app/candidature-service.service';
import { Offre } from 'src/app/models/offre';
import { OffreServiceService } from 'src/app/offre-service.service';

@Component({
  selector: 'app-offreforcandidatures',
  standalone: false,
  templateUrl: './offreforcandidatures.component.html',
  styleUrl: './offreforcandidatures.component.scss'
})
export class OffreforcandidaturesComponent implements OnInit {
  offres: any[] = [];
  groupedOffres: any[] = [];

  constructor(
    private offreService: OffreServiceService,
    private candidatureService: CandidatureServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOffres();
  }

  loadOffres(): void {
    this.offreService.getAllOffres().subscribe((offres) => {
      this.offres = offres;
      this.groupOffresByCompany();
    });
  }

  groupOffresByCompany(): void {
    const grouped = this.offres.reduce((acc, offre) => {
      const company = offre.user?.company;
      if (!acc[company]) {
        acc[company] = { company, offres: [] };
      }
      acc[company].offres.push(offre);
      return acc;
    }, {});

    this.groupedOffres = Object.values(grouped);
  }

  postuler(offreId: string): void {
    this.candidatureService.selectOffre(offreId).subscribe(
      response => {
        console.log(response); // Affiche la réponse textuelle
        this.router.navigate(['/postuler', offreId]);
      },
      error => {
        console.error('Erreur lors de la sélection de l\'offre', error);
      }
    );
  }
  
  
  
  onImageError(event: any): void {
    event.target.src = 'path/to/default/profile-pic.jpg'; // Image par défaut si l'image échoue
  }
}
