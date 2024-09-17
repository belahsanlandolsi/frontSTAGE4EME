import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponentComponent } from './pages/authentication/forgot-password-component/forgot-password-component.component';
import { ResetPasswordComponent } from './pages/authentication/reset-password/reset-password.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RoleEditDialogComponent } from './pages/role-edit-dialog-component/role-edit-dialog-component.component';
import { AdminRolesusersComponent } from './pages/admin-rolesusers/admin-rolesusers.component';
import { OffreComponent } from './pages/offre/offre.component';
import { AddOffreComponentComponent } from './pages/add-offre-component/add-offre-component.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonModule } from '@angular/common';
import { OffreforcandidaturesComponent } from './offreforcandidatures/offreforcandidatures.component';
import { PostulerOffreComponent } from './pages/postuler-offre/postuler-offre.component';
import { MescandidaturesComponent } from './pages/mescandidatures/mescandidatures.component';
import { MescandidaturespourENtrepriseComponent } from './pages/mescandidaturespour-entreprise/mescandidaturespour-entreprise.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { PagesModule } from './pages/pages.module';
import { RessourcesConseilsComponent } from './pages/ressources-conseils/ressources-conseils.component';
import { OffresSauvegardeesComponent } from './offres-sauvegardees/offres-sauvegardees.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  }
];
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    monthYearViewHeader: 'MMMM YYYY',
    yearColumnHeader: 'YYYY',
    monthYearColumnHeader: 'MMM YYYY',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    ForgotPasswordComponentComponent,
    ResetPasswordComponent,
    UserProfileComponent,
    RoleEditDialogComponent,
    AdminRolesusersComponent,
    OffreComponent,
    AddOffreComponentComponent,
    OffreforcandidaturesComponent,
    PostulerOffreComponent,
    MescandidaturesComponent,
    MescandidaturespourENtrepriseComponent,
    RessourcesConseilsComponent,
    OffresSauvegardeesComponent,
    AdminDashboardComponent    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    NgScrollbarModule,
    RouterModule.forRoot(routes),// Importation de RouterModule.forRoot dans le module principal
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    PagesModule,
    NgApexchartsModule
    
    
    
  ],
  
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  
    provideAnimationsAsync()
  ],
})
export class AppModule {}
