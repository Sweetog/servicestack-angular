import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';

import { PreloadSelectedModulesList } from './@core/preload-strategy'
import { PageNotFoundComponent } from './page-not-found.component';
import { AppRoutes } from './@core/const/routes/app-routes.const';
import { LicenseAgreementComponent } from './license-agreement.component';
import { NotAuthorizedComponent } from './not-authorized.component';
import { AuthGuard } from './@core/guards/auth.guard.service';
 
const routes: Routes = [
  // this is an example of a lazy loaded module route. This may be usfull for large module. 
  { path: 'sandbox', loadChildren: './sandbox/sandbox.module#SandboxModule'},
  { path: '', pathMatch: 'full', redirectTo: 'sandbox' },
  { path: AppRoutes.NotAuthorized, component: NotAuthorizedComponent},
  { path: AppRoutes.NotAuthorized, children: [
    { path: ':productId/:productFeatureId/:userRoleId', component: NotAuthorizedComponent },
    { path: ':productId/:productFeatureId', component: NotAuthorizedComponent },
    { path: ':productId', component: NotAuthorizedComponent }
  ] },
  { path: AppRoutes.LicenseAgreement, component: LicenseAgreementComponent},  
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  //PreloadAllModules preloadingStrategy will preload lazy loaded modules in the background but will not intefer with
  //Eagerly loaded modules
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadSelectedModulesList})],
  exports: [RouterModule],
  providers: [
    PreloadSelectedModulesList
  ]
})
export class AppRoutingModule { }

export const routableComponents = [
  PageNotFoundComponent,
  NotAuthorizedComponent,
  LicenseAgreementComponent
];