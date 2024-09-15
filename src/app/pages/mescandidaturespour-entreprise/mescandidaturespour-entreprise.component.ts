import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CandidatureServiceService } from 'src/app/candidature-service.service';
import { Candidature, CandidatureStatus } from 'src/app/models/Candidature';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-mescandidaturespour-entreprise',
  
  templateUrl: './mescandidaturespour-entreprise.component.html',
  styleUrl: './mescandidaturespour-entreprise.component.scss'
})
export class MescandidaturespourENtrepriseComponent implements OnInit {
  candidatures: Candidature[] = [];
  isLoading = true;
  error: string | null = null;
  user: User[] = [];
  statusOptions = Object.values(CandidatureStatus); // Utiliser l'énumération pour générer les options de statut
  cvUrls: { [key: string]: SafeResourceUrl } = {};
  lettreUrls: { [key: string]: SafeResourceUrl } = {};
  showCv: { [key: string]: boolean } = {}; // Suivre l'état d'affichage du CV
  showLettre: { [key: string]: boolean } = {}; // Suivre l'état d'affichage de la lettre

  constructor(private candidatureService: CandidatureServiceService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.candidatureService.getCandidaturesByOffres().subscribe(
      (data) => {
        this.candidatures = data;
        this.isLoading = false;
      },
      (err) => {
        this.error = 'Impossible de récupérer les candidatures.';
        this.isLoading = false;
      }
    );
  }

  onStatusChange(candidatureId: string, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newStatus = target.value as CandidatureStatus;
  
    if (newStatus) {
      this.updateStatus(candidatureId, newStatus);
    }
  }
  
  updateStatus(candidatureId: string, newStatus: CandidatureStatus): void {
    this.candidatureService.updateCandidatureStatus(candidatureId, newStatus).subscribe(
      (updatedCandidature) => {
        const index = this.candidatures.findIndex(c => c.id === candidatureId);
        if (index > -1) {
          this.candidatures[index].status = updatedCandidature.status;
        }
      },
      (error) => {
        this.error = 'Erreur lors de la mise à jour du statut.';
      }
    );
  }

  viewCv(candidatureId: string): void {
    this.candidatureService.getCvByCandidatureId(candidatureId).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        this.cvUrls[candidatureId] = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      },
      (error) => {
        this.error = 'Erreur lors du chargement du CV';
        console.error(error);
      }
    );
  }

  viewLettre(candidatureId: string): void {
    this.candidatureService.getLettreDeMotivationByCandidatureId(candidatureId).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        this.lettreUrls[candidatureId] = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      },
      (error) => {
        this.error = 'Erreur lors du chargement de la lettre de motivation';
        console.error(error);
      }
    );
  }
  toggleCv(candidatureId: string): void {
    if (!this.cvUrls[candidatureId]) {
      this.viewCv(candidatureId);
    }
    this.showCv[candidatureId] = !this.showCv[candidatureId];
  }

  toggleLettre(candidatureId: string): void {
    if (!this.lettreUrls[candidatureId]) {
      this.viewLettre(candidatureId);
    }
    this.showLettre[candidatureId] = !this.showLettre[candidatureId];
  }
}