import { Component, OnInit } from '@angular/core';
import { OffreServiceService } from '../offre-service.service';
import { OffreSauvegardee } from '../models/OffreSauvegardee';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Offre } from '../models/offre';

@Component({
  selector: 'app-offres-sauvegardees',
 
  templateUrl: './offres-sauvegardees.component.html',
  styleUrl: './offres-sauvegardees.component.scss'
})
export class OffresSauvegardeesComponent implements OnInit {
  offresSauvegardees: OffreSauvegardee[] = [];

  constructor(
    private offreService: OffreServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSavedOffres();
  }

  loadSavedOffres(): void {
    this.offreService.getSavedOffres().subscribe(
      (data: OffreSauvegardee[]) => {
        this.offresSauvegardees = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des offres sauvegardées', error);
        this.snackBar.open('Erreur lors du chargement des offres sauvegardées', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  sauvegarderOffre(offreId: string): void {
    if (!offreId) {
      console.error('offreId est vide ou non défini');
      return;
    }
    this.offreService.sauvegarderOffre(offreId).subscribe(
      () => {
        this.snackBar.open('Offre sauvegardée avec succès', 'Fermer', {
          duration: 3000,
        });
        this.loadSavedOffres(); // Recharger les offres sauvegardées pour mettre à jour la liste
      },
      (error) => {
        console.error('Erreur lors de la sauvegarde de l\'offre', error);
        this.snackBar.open('Erreur lors de la sauvegarde de l\'offre', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  // offres-sauvegardees.component.ts
desauvegarderOffre(offreId: string | undefined): void {
  if (!offreId) {
    console.error('offreId est vide ou non défini');
    return;
  }
  this.offreService.desauvegarderOffre(offreId).subscribe(
    () => {
      this.snackBar.open('Offre désenregistrée avec succès', 'Fermer', {
        duration: 3000,
      });
      this.loadSavedOffres(); // Recharger les offres sauvegardées pour mettre à jour la liste
    },
    (error) => {
      console.error('Erreur lors du désenregistrement de l\'offre', error);
      this.snackBar.open('Erreur lors du désenregistrement de l\'offre', 'Fermer', {
        duration: 3000,
      });
    }
  );
}
}