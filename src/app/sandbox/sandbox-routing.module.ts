import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TestComponent }  from './test.component';
import { HomeComponent }  from './home.component';
import { SandboxComponent }  from './sandbox.component';

const routes: Routes = [
  { 
      path: '', //Sandbox is a lazy loaded module so the 'sandbox' route is declared in the app-routing.module and this path must be an empty string so sandbox "lands" here
      component: SandboxComponent,
      children: [
          { path: '', component: TestComponent},
          { path: 'test', component: TestComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandboxRoutingModule { }

export const routedComponents = [TestComponent, SandboxComponent, HomeComponent ];
