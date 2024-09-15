import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { NavItem } from './nav-item/nav-item';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  filteredNavItems: NavItem[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.filteredNavItems = this.getFilteredNavItems();
  }

  getFilteredNavItems(): NavItem[] {
    const isAdmin = this.authService.isAdmin();
    const isEntreprise = this.authService.isEntreprise();

    // Combine les conditions pour admin et entreprise
    return navItems.filter(item => {
      if (item.adminOnly && !isAdmin) {
        return false; // Si l'élément est réservé aux admins et que l'utilisateur n'est pas admin
      }
      if (item.EntrepriseOnly && !isEntreprise) {
        return false; // Si l'élément est réservé aux entreprises et que l'utilisateur n'est pas une entreprise
      }
      return true; // Affiche l'élément si aucune restriction n'est violée
    });
  }
}