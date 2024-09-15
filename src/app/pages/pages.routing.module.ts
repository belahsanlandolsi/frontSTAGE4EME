import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PostulerOffreComponent } from './postuler-offre/postuler-offre.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },

  {
    path: 'profile',  // Ajouter la route pour le profil utilisateur
    component: UserProfileComponent,
    data: {
      title: 'User Profile',
    },
  },
];