import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

//rxjs convenience file
import './rxjs-extensions';

/**
 * SERVICES 
 */
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SpinnerService } from './spinner/spinner.service';
import { PaginationService } from './pagination/pagination.service';
import { GenerateStringService } from './generate-string.service';
import { ResizeService } from './page-resize.service';
import { ScrollService } from './scroll.service';
import { ValidationMessageService } from './validation/validation.message.service'
import { TimeService } from './time.service';
import { DistributorService } from './api/distributor/api.service';
import { CommodityService } from './api/commodity/api.service';
import { LoggingService } from './api/logging/api.service';
import { ContentService } from './api/content/api.service';
//Authentication
import { AuthService } from './auth/api/auth.service'
import { AuthGuard } from './guards/auth.guard.service'
import { CurrentUserService } from './auth/current-user.service'
//Helpers
import { ApiHelper } from './api/api.helper'
import { CurrentUserServiceHelper } from './auth/current-user-service.helper';


/**
 * CoreModule embraces a singelton pattern
 * CoreModule rarely has declarations
 * CoreModule commonly has providers
 * CoreModule is a place for Services
 * CoreModule is a place for Singelton Components like a Menu
 * CoreModule is only imported once by the AppModule
 */
@NgModule({
  //services here
  exports: [
    HttpModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    SpinnerService,
    AuthGuard,
    PaginationService,
    CurrentUserServiceHelper,
    CurrentUserService,
    GenerateStringService,
    ResizeService,
    ScrollService,
    ApiHelper,
    ValidationMessageService,
    TimeService,
    CommodityService,
    DistributorService,
    LoggingService,
    ContentService,
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}