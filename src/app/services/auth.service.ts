import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root', // This makes the service available throughout your application
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private userRole: string = 'USER'; // Par défaut, l'utilisateur est un utilisateur

  constructor(private http: HttpClient) { }
  getToken(): string | null {
    return localStorage.getItem('token'); // Adapté selon la manière dont vous stockez le token
  }
  registerUser(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:8081/api/auth/register', user)
      .pipe(
        catchError(error => {
          console.error('Registration failed', error);
          return throwError(() => new Error('Registration failed'));
        })
      );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8081/api/auth/check-email?email=${email}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  login(credentials: { login: string; password: string }): Observable<any> {
    const params = new HttpParams()
      .set('login', credentials.login)
      .set('password', credentials.password);

    return this.http.post<any>(`${this.apiUrl}/login`, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getProtectedData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/protected-endpoint`, {
      headers: this.getAuthHeaders()
    });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(code: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password-with-code`, { code, newPassword }).pipe(
      catchError(this.handleError)
    );
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getUserRole(): string {
    return this.userRole;
  }

  isAdmin(): boolean {
    return this.userRole === 'ROLE_ADMIN';
  }
  isEntreprise(): boolean {
    return this.userRole === 'ROLE_ENTREPRISE';
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`, {
      headers: this.getAuthHeaders()
    });
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}