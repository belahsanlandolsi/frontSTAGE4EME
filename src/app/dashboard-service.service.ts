import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  private apiUrl = 'http://localhost:8081/api/admin/dashboard';
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    // Récupération du jeton d'authentification
    const token = localStorage.getItem('token'); // ou récupérez le jeton d'une autre manière

    // Création des en-têtes avec le jeton d'authentification
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTotalOffres(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalOffres`, { headers: this.getHeaders() });
  }

  getTotalCandidatures(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalCandidatures`, { headers: this.getHeaders() });
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalUsers`, { headers: this.getHeaders() });
  }

  getOffresParUtilisateur(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/offresParUtilisateur`, { headers: this.getHeaders() });
  }

  getCandidaturesParOffre(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/candidaturesParOffre`, { headers: this.getHeaders() });
  }
}