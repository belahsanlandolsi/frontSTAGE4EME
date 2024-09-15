import { Offre } from "./offre";

export interface Candidature {
    user: any;
    id?: string;
    userId: string;
    offre: Offre | null; // Assurez-vous que le modèle Offre est défini
    cvUrl: string;
    lettreDeMotivationUrl: string;
    dateDeCandidature: string; // ISO 8601 date string format
    status: CandidatureStatus;
    
  }
  
  export enum CandidatureStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    ACCEPTED='ACCEPTED',
    SELECTED='SELECTED'
  }