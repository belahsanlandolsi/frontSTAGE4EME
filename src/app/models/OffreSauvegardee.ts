// offre-sauvegardee.model.ts
import { Offre } from './offre';
import { User } from './user.model';

export interface OffreSauvegardee {
    _id?: string; // Assurez-vous que le type correspond à l'ID dans votre base de données
    titreOffre: string;
    dateSauvegarde: Date;
    userId: string;
    offre: Offre;
}
