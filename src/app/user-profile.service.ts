import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiUrl = 'http://localhost:8081/api/candidature';

  constructor(private http: HttpClient) { }

  // Récupérer les détails du profil de l'utilisateur
  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // Mettre à jour le profil de l'utilisateur
  updateProfile(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/updateProfile`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }
  getProfilePic(): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiUrl}/profile/pic`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'blob' as 'json' // Type assertion required to avoid TypeScript error
    });
  }
}