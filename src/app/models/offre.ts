import { Candidature } from "./Candidature";
import { User } from "./user.model";

export interface Offre {
    id?: string;
    titre: string;
    description: string;
    entrepriseID?: string;
    type: string;
    dateDebut: Date;
    dateFin: Date;
    statut: string;
    imageUrl: string;
    user: User | null; // Assurez-vous que le modèle User est défini
    candidatures: Candidature[]; // Assurez-vous que le modèle Candidature est défini
    
  }
  