import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CandidatureServiceService } from 'src/app/candidature-service.service';
import { Offre } from 'src/app/models/offre';
import { OffreServiceService } from 'src/app/offre-service.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-offreforcandidatures',
  standalone: false,
  templateUrl: './offreforcandidatures.component.html',
  styleUrl: './offreforcandidatures.component.scss'
})
export class OffreforcandidaturesComponent implements OnInit {
  offres: any[] = [];
  groupedOffres: any[] = [];
  savedOffers: Set<string> = new Set();
  userId: string | null = null; // ID utilisateur local

  constructor(
    private offreService: OffreServiceService,
    private candidatureService: CandidatureServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadUserAndOffres(); // Load user and offers
  }

  loadUserAndOffres(): void {
    this.authService.getCurrentUser().subscribe(
      user => {
        this.userId = user._id; // Stocker l'ID utilisateur localement
        this.loadOffres();
      },
      error => {
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
      }
    );
  }

  loadOffres(): void {
    this.offreService.getAllOffres().subscribe((offres) => {
      this.offres = offres;
      this.groupOffresByCompany();
      this.loadSavedOffres();
    });
  }

  loadSavedOffres(): void {
    this.offreService.getSavedOffres().subscribe(savedOffers => {
      this.savedOffers = new Set(savedOffers.map(offer => offer.offre?.id).filter((id): id is string => !!id));
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

  sauvegarderOffre(offreId: string): void {
    if (!offreId) return;
    this.offreService.sauvegarderOffre(offreId).subscribe(
      () => {
        this.savedOffers.add(offreId);
        this.snackBar.open('Offre sauvegardée avec succès', 'Fermer', {
          duration: 3000,
        });
      },
      (error) => {
        if (error.status === 400 && error.error.message === "L'offre est déjà sauvegardée.") {
          this.snackBar.open('Cette offre est déjà dans vos sauvegardes', 'Fermer', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Erreur lors de la sauvegarde de l\'offre', 'Fermer', {
            duration: 3000,
          });
        }
      }
    );
  }

  desauvegarderOffre(offreId: string): void {
    if (!offreId) return;
    this.offreService.desauvegarderOffre(offreId).subscribe(
      () => {
        this.savedOffers.delete(offreId);
        this.snackBar.open('Offre désenregistrée avec succès', 'Fermer', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open('Erreur lors du désenregistrement de l\'offre', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  isSaved(offreId: string): boolean {
    return this.savedOffers.has(offreId);
  }
}