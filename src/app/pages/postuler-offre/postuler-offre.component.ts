import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CandidatureServiceService } from 'src/app/candidature-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-postuler-offre',
  standalone: false,
  templateUrl: './postuler-offre.component.html',
  styleUrl: './postuler-offre.component.scss'
})
export class PostulerOffreComponent implements OnInit {
  user: any; // Stocker les informations de l'utilisateur
  selectedCv: File | null = null;
  selectedLettreDeMotivation: File | null = null;
  offreId: string | null = null;

  constructor(
    private authService: AuthService,
    private candidatureService: CandidatureServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router // Injection du Router
  ) {}

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur connecté
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });

    // Récupérer l'ID de l'offre depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.offreId = params.get('id');
      console.log('Offre ID récupéré:', this.offreId); // Doit afficher un ID non null
    });
  }    

  // Méthode pour sélectionner les fichiers (CV et lettre de motivation)
  onFileSelect(event: any, type: string): void {
    if (event.target.files.length > 0) {
      if (type === 'cv') {
        this.selectedCv = event.target.files[0];
      } else if (type === 'lettreDeMotivation') {
        this.selectedLettreDeMotivation = event.target.files[0];
      }
    }
  }

  // Afficher un message via SnackBar
  openSnackBar(message: string, action: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }

  // Méthode pour postuler à une offre
  onSubmit(): void {
    if (this.selectedCv && this.selectedLettreDeMotivation && this.offreId) {
      // Créer un FormData pour envoyer les fichiers
      const formData = new FormData();
      formData.append('cv', this.selectedCv);
      formData.append('lettreDeMotivation', this.selectedLettreDeMotivation);
      const dateDeCandidature = new Date(); // Date actuelle

      // Appel au service pour postuler à l'offre
      this.candidatureService.postulerCandidature(this.offreId, this.selectedCv, this.selectedLettreDeMotivation)
        .subscribe({
          next: (response) => {
            dateDeCandidature: dateDeCandidature.toISOString(), // Convertir la date en format ISO

            console.log('Candidature réussie', response);
            this.openSnackBar('Candidature réussie !', 'Fermer', 'success');
            this.router.navigate(['/offreforcandidatures']); // Redirection après succès
          },
          error: (err: HttpErrorResponse) => {
            console.error('Erreur lors de la candidature', err);
            this.openSnackBar('Erreur lors de la candidature.', 'Fermer', 'error');
          }
        });
    } else {
      this.openSnackBar('Veuillez remplir tous les champs.', 'Fermer', 'error');
    }
  }
}