import { Component } from '@angular/core';
import { CandidatureServiceService } from 'src/app/candidature-service.service';
import { Candidature } from 'src/app/models/Candidature';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mescandidatures',
  templateUrl: './mescandidatures.component.html',
  styleUrl: './mescandidatures.component.scss'
})
export class MescandidaturesComponent {
  candidatures: Candidature[] = [];
  hasCandidatures: boolean = true;  // Variable pour vérifier s'il y a des candidatures

  constructor(
    private candidatureService: CandidatureServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.candidatureService.getMesCandidatures().subscribe((data: Candidature[]) => {
      console.log("Candidatures récupérées:", data); // Log des candidatures
      this.candidatures = data;
      this.hasCandidatures = this.candidatures.length > 0;  // Vérifiez si des candidatures sont disponibles
    }, error => {
      console.error('Erreur lors du chargement des candidatures', error);
      this.hasCandidatures = false;  // Si une erreur se produit, aucune candidature n'est récupérée
    });
  }
}