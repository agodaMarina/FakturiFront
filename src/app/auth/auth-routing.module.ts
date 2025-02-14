import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivationComponent } from './activation/activation.component';


const routes: Routes = [{ path: '', component: AuthComponent , children:[
  {path:'login', component:LoginComponent},
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'activate',component:ActivationComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
