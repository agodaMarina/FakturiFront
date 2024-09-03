import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ActivationComponent } from './activation/activation.component';

import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CodeInputModule } from 'angular-code-input';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    ActivationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    PasswordModule,
    DividerModule,
    CodeInputModule,
    ConfirmDialogModule,
    ToastModule
  ]
})
export class AuthModule { }
