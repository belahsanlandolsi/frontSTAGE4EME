import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          // Stockage du token dans le localStorage
          localStorage.setItem('token', response.token);
          
          // Stockage du rôle dans le service d'authentification
          this.authService.setUserRole(response.role); // Assurez-vous que 'role' est inclus dans la réponse

          // Redirection vers le tableau de bord ou la page d'accueil
          this.router.navigate(['/dashboard']);
        },
        error => {
          // Gestion des erreurs de connexion
          console.error('Login error', error);
        }
      );
    }
  }
}