import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from 'src/app/models/Type';
import { Offre } from 'src/app/models/offre';
import { OffreServiceService } from 'src/app/offre-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-offre-component',

  templateUrl: './add-offre-component.component.html',
  styleUrl: './add-offre-component.component.scss'
})
export class AddOffreComponentComponent {
  types = Object.values(Type);
  selectedType: Type = Type.FORMATION_HUMAINE_SOCIALE; // Valeur par défaut
  
  offre: Offre = {
    titre: '',
    description: '',
    type: Type.FORMATION_HUMAINE_SOCIALE, // Assurez-vous que le type est défini correctement
    dateDebut: new Date(),
    dateFin: new Date(),
    statut: '',
    imageUrl: '', // Ce champ est défini dans votre modèle mais pas dans la méthode d'envoi
    user: null, // Ce champ est défini dans votre modèle mais pas dans la méthode d'envoi
    candidatures: []
  };

  constructor(
    private offreService: OffreServiceService,
    public router: Router,
    private authService: AuthService // Service pour obtenir l'utilisateur connecté
  ) {}

  ngOnInit(): void {
    // Assurez-vous que l'utilisateur est une entreprise connectée
    this.authService.getCurrentUser().subscribe(user => {
      if (user && user.roles && user.roles.includes('ENTREPRISE')) {
        // Associer l'utilisateur connecté à l'offre
        this.offre.user = user; // Associe l'utilisateur connecté (entreprise) à l'offre
      } else {
        // Rediriger vers une autre page si ce n'est pas une entreprise
        this.router.navigate(['/add-offre']);
      }
    }, error => {
      // Gérer les erreurs éventuelles lors de la récupération de l'utilisateur
      console.error('Erreur lors de la récupération de l\'utilisateur', error);
      this.router.navigate(['/add-offre']);
    });
  }

  onSubmit(): void {
    this.offreService.createOffre(
      this.offre.titre,
      this.offre.description,
      this.offre.type.toString(),
      this.offre.dateDebut,
      this.offre.dateFin,
      this.offre.statut,
    ).subscribe(() => {
      this.router.navigate(['/offres']);
    });
  }
}