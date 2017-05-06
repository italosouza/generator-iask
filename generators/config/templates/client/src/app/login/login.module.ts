import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [

  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class LoginModule {
}
