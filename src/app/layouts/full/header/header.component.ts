import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfileService } from 'src/app/user-profile.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  profilePicUrl: string = '';

  constructor(private userservice: UserProfileService) {}

  ngOnInit(): void {
    this.loadUserProfilePic();
  }
  loadUserProfilePic(): void {
    this.userservice.getProfilePic().subscribe(
      (response) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (result) {
            this.profilePicUrl = result as string; // Assure que result n'est pas null
          }
        };
        reader.readAsDataURL(response);
      },
      (error) => {
        console.error('Erreur lors du chargement de la photo de profil', error);
        this.profilePicUrl = 'path/to/default/profile-pic.jpg';
      }
    );
  }
}