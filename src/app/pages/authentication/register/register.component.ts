import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  form: FormGroup;
  isSubmitting: boolean = false;
  isCompany: boolean = false; // Pour déterminer si l'utilisateur est une entreprise

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // Add MatSnackBar to show notifications
  ) {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      login: new FormControl('', [Validators.required, Validators.minLength(6)]),
      emailPro: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      company: new FormControl(''), // Champ optionnel
      userType: new FormControl('individual', [Validators.required]), // 'individual' ou 'company'
    });
  }

  get f() {
    return this.form.controls;
  }

  onUserTypeChange(value: string) {
    this.isCompany = value === 'company';
    if (!this.isCompany) {
      this.form.get('company')?.setValue(''); // Clear company field if not a company
    }
  }

  submit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      const user: User = {
        firstName: this.form.value.firstName!,
        lastName: this.form.value.lastName!,
        emailPro: this.form.value.emailPro!,
        password: this.form.value.password!,
        company: this.isCompany ? this.form.value.company : undefined,
        active: this.form.value.isActive,
      };

      this.authService.registerUser(user).subscribe(
        response => {
          console.log('User registered successfully:', response);
          
          this.snackBar.open('Registration successful. .', 'Close', {
            duration: 5000,
            panelClass: ['custom-snackbar']
          });
          this.router.navigate(['/authentication/login']); // Navigate to login or other page after success
        },
        error => {
          console.error('Registration failed:', error);
          this.snackBar.open('Registration failed. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['custom-snackbar']
          });
        },
        () => {
          this.isSubmitting = false;
        }
      );
    } else {
      console.error('Form is invalid');
      this.snackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 5000,
        panelClass: ['custom-snackbar']
      });
    }
  }
}