import { User } from './user';

export interface Historique {
  id?: number;
  date?: Date;
  montant?: number;
  typeOeration?: string;
  user?: User;
}
