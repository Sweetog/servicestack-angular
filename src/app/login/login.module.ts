// Vendor 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Modules
import { SharedModule } from '../@shared/shared.module';
// Routing 
import { LoginRoutingModule, RoutedComponents } from './login-routing.module';
// Components
import { LoginComponent } from './login.component';
//Modal
import { ForgotPasswordModal } from './modal/forgot-password.modal';



@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LoginRoutingModule
  ],
  providers: [],
  declarations: [
    RoutedComponents,
    LoginComponent,
    ForgotPasswordModal
  ],
  entryComponents: [
    ForgotPasswordModal,
  ]
})
export class LoginModule { }

