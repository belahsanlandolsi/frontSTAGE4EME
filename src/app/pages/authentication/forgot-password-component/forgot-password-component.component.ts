import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-forgot-password-component',
  standalone: false,
  
  templateUrl: './forgot-password-component.component.html',
})
export class ForgotPasswordComponentComponent {
  forgotPasswordForm: FormGroup;
  isLoading: boolean = false; // Ajout de la variable de chargement

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // Ajouter MatSnackBar ici
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendResetCode() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true; // Démarrer le chargement
      const email = this.forgotPasswordForm.value.email;
      this.authService.forgotPassword(email).subscribe(
        response => {
          this.isLoading = false; // Arrêter le chargement
          this.snackBar.open('Reset code sent successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          // Vous pouvez rediriger vers une autre page après un certain délai si nécessaire
          // setTimeout(() => this.router.navigate(['/authentication/reset-password']), 3000);
        },
        error => {
          this.isLoading = false; // Arrêter le chargement
          this.snackBar.open('Failed to send reset code', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      );
    }
  }
}