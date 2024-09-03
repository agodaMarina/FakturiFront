import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './tools/sidebar/sidebar.component';
import { NavbarComponent } from './tools/navbar/navbar.component';
import { FooterComponent } from './tools/footer/footer.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { DepenseComponent } from './page/depense/depense.component';
import { RevenuComponent } from './page/revenu/revenu.component';
import { RapportComponent } from './page/rapport/rapport.component';
import { ProfileComponent } from './page/settings/profile/profile.component';
import { SettingsComponent } from './page/settings/settings.component';
import { SoldeComponent } from './page/settings/solde/solde.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './page/depense/add/add.component';
import { DetailComponent } from './page/depense/detail/detail.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CategorieComponent } from './page/settings/categorie/categorie.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    DepenseComponent,
    RevenuComponent,
    RapportComponent,
    ProfileComponent,
    SettingsComponent,
    SoldeComponent,
    AddComponent,
    DetailComponent,
    CategorieComponent,
    
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ScrollPanelModule,
    ToastModule,
    RippleModule
    
  ]
})
export class LayoutModule { }
