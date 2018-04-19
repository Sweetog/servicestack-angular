import { NgModule } from '@angular/core';
// Modules
// Routing 
import { SandboxRoutingModule, routedComponents } from './sandbox-routing.module';
// Services
import { TestService } from './api/api.service';


@NgModule({
  imports: [
    SandboxRoutingModule,
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    TestService
  ]
})
export class SandboxModule { }

