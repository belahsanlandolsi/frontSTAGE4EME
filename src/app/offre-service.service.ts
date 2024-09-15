import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Offre } from './models/offre';

@Injectable({
  providedIn: 'root'
})
export class OffreServiceService {

  private apiUrl = 'http://localhost:8081/api/offres';

  private apiUrl1 = 'http://localhost:8081/api/offres/add';
  private apiUrl2 = 'http://localhost:8081/api/candidature'; // URL du backend


  constructor(private http: HttpClient) { } // Injection de HttpClient

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assurez-vous que le token est bien stocké
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl2}/offres`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getOffreById(id: string): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  createOffre(titre: string, description: string, type: string, dateDebut: Date, dateFin: Date, statut: string, imageFile?: File): Observable<Offre> {
    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('dateDebut', dateDebut.toISOString());
    formData.append('dateFin', dateFin.toISOString());
    formData.append('statut', statut);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    return this.http.post<Offre>(this.apiUrl1, formData, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  
  

  updateOffre(id: string, offre: Offre): Observable<Offre> {
    return this.http.put<Offre>(`${this.apiUrl}/${id}`, offre, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteOffre(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post<string>(`${this.apiUrl}/uploadImage`, formData, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    // Affichez ou loguez les erreurs selon vos besoins
    console.error('Une erreur est survenue:', error);
    return throwError(() => new Error('Une erreur est survenue, veuillez réessayer plus tard.'));
  }

  getOffresForCurrentUser(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/my-offres`, { headers: this.getAuthHeaders() });
  }

  
  
}