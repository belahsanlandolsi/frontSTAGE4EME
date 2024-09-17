import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { RoleName } from './models/RoleName';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  private apiUrl = 'http://localhost:8081/api/admin';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private getToken(): string | null {
    return localStorage.getItem('token'); // ou autre méthode pour obtenir le token
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers: this.getAuthHeaders() });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${id}`, { headers: this.getAuthHeaders() });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user`, user, { headers: this.getAuthHeaders() });
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user/${id}`, user, { headers: this.getAuthHeaders() });
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/${id}`, { headers: this.getAuthHeaders() });
  }

  updateUserRoles(id: string, roles: RoleName[]): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user/${id}/roles`, roles, { headers: this.getAuthHeaders() });
  }

  isUserCompany(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/user/${id}/is-company`, { headers: this.getAuthHeaders() });
  }

  updateUserStatus(id: string, status: boolean): Observable<any> {
    const action = status ? 'activate' : 'deactivate';
    return this.http.put(`${this.apiUrl}/users/${id}/${action}`, {}, { headers: this.getAuthHeaders() });
  }
  

  getAvailableRoles(): Observable<RoleName[]> {
    return this.http.get<RoleName[]>(`${this.apiUrl}/roles`, { headers: this.getAuthHeaders() });
  }
}