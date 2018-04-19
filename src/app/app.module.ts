// Vendor
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
//Http
import { HttpInterceptor } from './@blocks/http/http.interceptor'; //not in use. 
// Routing
import { AppRoutingModule, routableComponents } from './app-routing.module';
//Components
import { AppComponent } from './app.component';

//Feature Modules
import { CoreModule } from './@core/core.module';
import { LoginModule } from './login/login.module';


//Singletons - A Singleton Service shall only be kept in app.module.ts "providers" (array)
//and it shall not be placed in any other component or service provider (array).
import { TokenService } from './@core/auth/token.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    CoreModule,
    LoginModule,
    //Do not import feature modules below "AppRoutingModule"
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2PageScrollModule.forRoot(),
    Ng2DragDropModule.forRoot(),
    ToastModule.forRoot()
  ],
  declarations: [
    AppComponent,
    routableComponents
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    TokenService
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
  /**
     * Allows for retrieving singletons using `AppModule.injector.get(MyService)`
     * This is good to prevent injecting the service as constructor parameter.
     */
  static injector: Injector;
  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}