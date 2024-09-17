import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard1',
    adminOnly: true, // Indique que cet élément est réservé aux admins

  },
  {
    displayName: 'Users',
    iconName: 'layout-dashboard',
    route: '/admin/roles-users',
    adminOnly: true, // Indique que cet élément est réservé aux admins

  },
 
  {
    displayName: 'Listes des Offres',
    iconName: 'list',
    route: '/offres',
    EntrepriseOnly:true,

  },
  {
    displayName: 'Ajouter Offres',
    iconName: 'list',
    route: '/add-offre',
    EntrepriseOnly:true,
    
  },
  {
    displayName: 'Les Offres',
    iconName: 'list',
    route: '/offreforcandidatures',
    
  },
  {
    displayName: 'Mes Demandes',
    iconName: 'layout-navbar-expand',
    route: '/mescandidatures',
    
  },
  {
    displayName: 'Mes Candidatures',
    iconName: 'layout-navbar-expand',
    route: '/mescandidaturesEntreprise',
    EntrepriseOnly:true,

  },
  {
    displayName: 'Ressources et Conseils',
    iconName: 'poker-chip',
    route: '/ressources',

  },
  {
    displayName: 'MES OFFRES',
    iconName: 'tooltip',
    route: '/offresaved',

  },



  
 
]