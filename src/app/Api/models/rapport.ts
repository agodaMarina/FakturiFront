import { Achat } from "./achat";
import { User } from "./user";

export interface Rapport {
  id?: number; // Correspond à  "private int id;"  en Java
  startDate?: Date; // Correspond à "private LocalDate startDate"
  endDate?: Date;
  soldeInitial?: number;
  soleFinal?: number;
  totalDepenses?: number;
  totalRevenus?: number;
  depenses?: Achat[];
  depensesParJour?: { [date: string]: number }; //  Dictionnaire clé-valeur
  depensesParCategorie?: { [category: string]: number }; //  Dictionnaire clé-valeur
  user: User | null; 
}
