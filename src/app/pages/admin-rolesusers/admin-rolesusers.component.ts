import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin-service.service';
import { User, UserCreate } from 'src/app/models/user.model';
import { RoleEditDialogComponent } from '../role-edit-dialog-component/role-edit-dialog-component.component';

@Component({
  selector: 'app-admin-rolesusers',
  standalone: false,
  templateUrl: './admin-rolesusers.component.html',
  styleUrl: './admin-rolesusers.component.scss'
})
export class AdminRolesusersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'status', 'actions'];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe(
      (users) => {
        console.log('Users loaded:', users); // Vérifiez les données reçues
        this.users = users;
      },
      (error) => this.snackBar.open('Failed to load users', 'Close', { duration: 3000 })
    );
  }

  editUserRoles(user: UserCreate) {
    const dialogRef = this.dialog.open(RoleEditDialogComponent, {
      width: '400px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && user._id) { // Assurez-vous que l'ID est défini
        this.adminService.updateUserRoles(user._id, result.roles).subscribe(
          () => {
            this.snackBar.open('Roles updated successfully', 'Close', { duration: 3000 });
            this.loadUsers(); // Recharge la liste des utilisateurs
          },
          (error) => this.snackBar.open('Failed to update roles: ' + (error.message || 'Unknown error'), 'Close', { duration: 3000 })
        );
      } else {
        this.snackBar.open('User ID is not defined', 'Close', { duration: 3000 });
      }
    });
  }

  deleteUser(_id: string) {
    if (_id) { // Assurez-vous que l'ID n'est pas undefined
      this.adminService.deleteUser(_id).subscribe(
        () => {
          this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
          this.loadUsers(); // Recharge la liste des utilisateurs
        },
        (error) => this.snackBar.open('Failed to delete user: ' + (error.message || 'Unknown error'), 'Close', { duration: 3000 })
      );
    } else {
      this.snackBar.open('User ID is not defined', 'Close', { duration: 3000 });
    }
  }

  toggleUserStatus(user: UserCreate): void {
    const newStatus = !user.isActive; // Toggle l'état actuel de l'utilisateur
    this.adminService.updateUserStatus(user._id, newStatus).subscribe({
      next: () => {
        user.isActive = newStatus; // Met à jour l'état dans l'interface
        this.snackBar.open(`User ${newStatus ? 'activated' : 'deactivated'} successfully`, 'Close', { duration: 3000 });
        console.log(`User status updated to ${newStatus ? 'Active' : 'Inactive'}`);
      },
      error: (error) => {
        this.snackBar.open('Failed to update user status', 'Close', { duration: 3000 });
        console.error('Failed to update user status', error);
      }
    });
  }
}  