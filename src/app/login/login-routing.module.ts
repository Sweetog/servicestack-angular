import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AppRoutes } from '../@core/const/routes/app-routes.const';

const routes: Routes = [
  { path: AppRoutes.Login, component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LoginRoutingModule { }
export const RoutedComponents = [LoginComponent];

