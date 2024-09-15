import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Candidature, CandidatureStatus } from './models/Candidature';
import { User } from './models/user.model';
import { Offre } from './models/offre';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatureServiceService {
  private apiUrl = 'http://localhost:8081/api/candidature'; // URL du backend
  private apiUrl3 = 'http://localhost:8081/api/entreprises'; // URL du backend

  private apiUrl1 = 'http://localhost:8081/api/candidature/select';
  private apiUrl2 = 'http://localhost:8081/api/entreprises/candidaturesByCurrentUserOffres';

  constructor(private http: HttpClient,private authService: AuthService) {}

  postulerCandidature(offreId: string, cv: File, lettreDeMotivation: File): Observable<any> {
    const formData = new FormData();
    formData.append('cv', cv);
    formData.append('lettreDeMotivation', lettreDeMotivation);
  
    // Récupération du jeton d'authentification
    const token = localStorage.getItem('token'); // ou récupérez le jeton d'une autre manière
  
    // Ajout du jeton dans les en-têtes de la requête
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post(`${this.apiUrl}/postuler/${offreId}`, formData, { headers });
  }
  
  updateCandidatureStatus(id: string, status: CandidatureStatus): Observable<Candidature> {
    const request = { status };  // Assurez-vous que `status` est du type `CandidatureStatus`
    const token = localStorage.getItem('token'); // Assurez-vous que le jeton JWT est stocké ici
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Candidature>(`${this.apiUrl3}/${id}/status`, request, { headers });
  }
  

 

  postuler(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Assurez-vous que 'authToken' est stocké
    });
    return this.http.post(`${this.apiUrl}/postuler`, formData, { headers });
  }

// GET: Récupérer les candidatures de l'utilisateur connecté
getMesCandidatures(): Observable<Candidature[]> {
  const token = localStorage.getItem('token'); // Assurez-vous que le jeton JWT est stocké ici
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<Candidature[]>(`${this.apiUrl}/mesCandidatures`, { headers });
}

getCandidaturesByOffres(): Observable<Candidature[]> {
  const token = localStorage.getItem('token'); // Assurez-vous que le jeton JWT est stocké ici
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<Candidature[]>(this.apiUrl2, { headers });
}
// GET: Récupérer une candidature par son ID
getCandidatureById(candidatureId: string): Observable<Candidature> {
  return this.http.get<Candidature>(`${this.apiUrl}/${candidatureId}`);
}

// GET: Récupérer le CV d'une candidature
getCvByCandidatureId(candidatureId: string): Observable<Blob> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.apiUrl3}/cv/${candidatureId}`, { headers, responseType: 'blob' });
}

getLettreDeMotivationByCandidatureId(candidatureId: string): Observable<Blob> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.apiUrl3}/lettre/${candidatureId}`, { headers, responseType: 'blob' });
}

 // Méthode pour sélectionner une offre (à utiliser pour stocker l'ID de l'offre dans la session)

 selectOffre(offreId: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });
  return this.http.post(`${this.apiUrl}/select`, { offreId }, { headers });
}







}
