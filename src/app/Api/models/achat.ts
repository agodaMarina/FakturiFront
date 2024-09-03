/* tslint:disable */
/* eslint-disable */
import { Categorie } from './categorie';
import { ImageData } from './image-data';
import { User } from './user';
export interface Achat {
  dateEcheance?: string;
  dateEmission?: string;
  fournisseur?: string;
  categorie?:Categorie;
  id?: number;
  image?: ImageData;
  numero?: string;
  statut?: boolean;
  totalttc?: number;
  totaltva?: number;
  tva?: number;
  user?: User;
}
