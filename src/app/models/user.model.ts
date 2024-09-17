// src/app/models/user.model.ts
export interface User {
    firstName: string;
    lastName: string;
    emailPro: string;
    password: string;
    roles?: string[]; // Optional roles field
    company?: string; // Optionnel pour les entreprises
    active: boolean; // Ajoutez cette propriété
    pic?: string;  // Chemin de l'image de l'utilisateur

}
    export interface UserCreate extends User  {
        _id: string;
        roles: string[]; // ou les rôles spécifiques que vous avez définis
        // Ajoutez d'autres propriétés nécessaires pour un utilisateur existant
        isActive: boolean; // Assurez-vous que ce champ est défini ici

      }

