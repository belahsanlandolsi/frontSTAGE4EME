import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin-service.service';
import { RoleName } from 'src/app/models/RoleName';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-role-edit-dialog-component',
  standalone: false,
  templateUrl: './role-edit-dialog-component.component.html',
  styleUrl: './role-edit-dialog-component.component.scss'
})
export class RoleEditDialogComponent {
  roles: RoleName[] = []; // Rôles sélectionnés par l'utilisateur
  availableRoles: RoleName[] = []; // Rôles disponibles
  constructor(
    public dialogRef: MatDialogRef<RoleEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private adminService: AdminService // Assurez-vous que AdminService est correctement importé
  ) { }

  ngOnInit(): void {
    this.loadAvailableRoles();
  }

  loadAvailableRoles() {
    this.adminService.getAvailableRoles().subscribe(
      roles => this.availableRoles = roles,
      error => console.error('Failed to load roles', error)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close({ roles: this.roles });
  }
}