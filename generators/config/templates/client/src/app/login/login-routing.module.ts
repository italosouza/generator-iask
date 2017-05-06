import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Registrar' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
