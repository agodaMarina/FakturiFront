import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { DepenseComponent } from './page/depense/depense.component';
import { RevenuComponent } from './page/revenu/revenu.component';
import { RapportComponent } from './page/rapport/rapport.component';
import { ProfileComponent } from './page/settings/profile/profile.component';
import { SettingsComponent } from './page/settings/settings.component';
import { SoldeComponent } from './page/settings/solde/solde.component';
import { AddComponent } from './page/depense/add/add.component';
import { DetailComponent } from './page/depense/detail/detail.component';
import { CategorieComponent } from './page/settings/categorie/categorie.component';

const routes: Routes = [{ path: '', component: LayoutComponent, children:[
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path:'dashboard', component:DashboardComponent},
  {path:'depenses', component:DepenseComponent},
  {path:'add-depense',component:AddComponent},
  {path:'detail/:id',component:DetailComponent},
  {path:'revenu', component:RevenuComponent},
  {path:'rapport', component:RapportComponent},
  {path:'setting', component:SettingsComponent, children:[
    {path:'profile', component:ProfileComponent},
    {path:'solde', component:SoldeComponent},
    {path:'categorie',component:CategorieComponent},
    {path:'', redirectTo: 'profile', pathMatch: 'full' },
    
  ]},
  
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
