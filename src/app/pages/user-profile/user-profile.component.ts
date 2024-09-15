import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/user-profile.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']

})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  profilePicUrl: string = '';
  editMode: boolean = false;
  userProfile: any = {};

  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService
  ) {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      company: [''],
      profilePic: [null]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUserProfilePic();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  loadUserProfile(): void {
    this.userProfileService.getProfile().subscribe(
      (profile) => {
        this.userProfile = profile;
        this.profileForm.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
          phoneNumber: profile.phoneNumber,
          company:profile.company
        });
      },
      (error) => {
        console.error('Erreur lors du chargement du profil utilisateur', error);
      }
    );
  }

  loadUserProfilePic(): void {
    this.userProfileService.getProfilePic().subscribe(
      (response: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.profilePicUrl = reader.result as string;
        };
        reader.readAsDataURL(response);
      },
      (error) => {
        console.error('Erreur lors du chargement de la photo de profil', error);
        this.profilePicUrl = 'assets/default-profile-pic.jpg';
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.profileForm.patchValue({
        profilePic: file
      });
    }
  }

  updateProfile(): void {
    const formData = new FormData();
    formData.append('firstName', this.profileForm.get('firstName')?.value);
    formData.append('lastName', this.profileForm.get('lastName')?.value);
    formData.append('phoneNumber', this.profileForm.get('phoneNumber')?.value);
    formData.append('company', this.profileForm.get('company')?.value);


    if (this.profileForm.get('profilePic')?.value) {
      formData.append('pic', this.profileForm.get('profilePic')?.value);
    }

    this.userProfileService.updateProfile(formData).subscribe(
      (response) => {
        console.log('Profil mis à jour avec succès', response);
        this.toggleEditMode();
        this.loadUserProfile(); // Refresh user profile data
        this.loadUserProfilePic(); // Refresh user profile picture
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du profil', error);
      }
    );
  }
}