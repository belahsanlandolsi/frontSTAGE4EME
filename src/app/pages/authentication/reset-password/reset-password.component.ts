import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      code: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      const { code, newPassword } = this.resetPasswordForm.value;
      
      this.authService.resetPassword(code, newPassword).subscribe(
        response => {
          this.isLoading = false;
          this.snackBar.open('Password reset successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.router.navigate(['/authentication/login']);
        },
        error => {
          this.isLoading = false;
          // Check for specific error status or message from the backend
          const errorMessage = error.error?.message || 'Failed to reset password';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      );
    }
  }
}