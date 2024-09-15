import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Offre } from 'src/app/models/offre';
import { OffreServiceService } from 'src/app/offre-service.service';

@Component({
  selector: 'app-offre',
  standalone: false,
  templateUrl: './offre.component.html',
  styleUrl: './offre.component.scss'
})
export class OffreComponent implements OnInit{
  offres: Offre[] = [];
  offre: Offre = {
    id: '',
    titre: '',
    description: '',
    entrepriseID: '',
    type: '',
    dateDebut: new Date(),
    dateFin: new Date(),
    statut: '',
    imageUrl: '',
    user: null,
    candidatures: []
  };
  displayedColumns: string[] = ['id', 'titre', 'description', 'actions']; // Ajoutez cette ligne
  editMode = false;

  constructor(public offreService: OffreServiceService, public route: ActivatedRoute, public router: Router,private snackbar:MatSnackBar) {} // Changement ici

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.offreService.getOffreById(id).subscribe((data: Offre) => {
        this.offre = data;
      });
    } else {
      this.loadOffresForCurrentUser();
    }
  }

  loadOffres(): void {
    this.offreService.getAllOffres().subscribe((data: Offre[]) => {
      this.offres = data;
    });
  }
  loadOffresForCurrentUser() {
    this.offreService.getOffresForCurrentUser().subscribe(
      (offres) => {
        this.offres = offres; // Stocker les offres dans une variable du composant
      },
      (error) => this.snackbar.open('Failed to load offers', 'Close', { duration: 3000 })
    );
  }
  
  onSubmit(): void {
     
    } 
  
  

  deleteOffre(id: string): void {
    this.offreService.deleteOffre(id).subscribe(() => {
      this.loadOffres();
    });
  }

  editOffre(id: string): void {
    this.router.navigate(['/offres', id]);
  }
}