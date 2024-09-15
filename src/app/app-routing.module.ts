import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AdminRolesusersComponent } from './pages/admin-rolesusers/admin-rolesusers.component';
import { RoleEditDialogComponent } from './pages/role-edit-dialog-component/role-edit-dialog-component.component';
import { OffreComponent } from './pages/offre/offre.component';
import { AddOffreComponentComponent } from './pages/add-offre-component/add-offre-component.component';
import { OffreforcandidaturesComponent } from './offreforcandidatures/offreforcandidatures.component';
import { PostulerOffreComponent } from './pages/postuler-offre/postuler-offre.component';
import { MescandidaturesComponent } from './pages/mescandidatures/mescandidatures.component';
import { MescandidaturespourENtrepriseComponent } from './pages/mescandidaturespour-entreprise/mescandidaturespour-entreprise.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      
      {
        path: 'postuler/:id',
        component: PostulerOffreComponent, // Le composant qui gère la postulation
      },
      
      
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'offres',
        component: OffreComponent,
      },
      {
        path: 'add-offre',
        component: AddOffreComponentComponent,
      },
      {
        path: 'offreforcandidatures',
        component: OffreforcandidaturesComponent,
      },
      {
        path: 'mescandidatures',
        component: MescandidaturesComponent,
      },
      {
        path: 'mescandidaturesEntreprise',
        component: MescandidaturespourENtrepriseComponent,
      },

     
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      {
        path: 'admin/roles-users',
        component: AdminRolesusersComponent,
      },
      {
        path: 'admin/role-edit',
        component: RoleEditDialogComponent,
      },
     
    ],
  },
  
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
