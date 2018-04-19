import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CurrentUserService } from '../auth/current-user.service';
import { AppRoutes } from '../const/routes/app-routes.const';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private currentUserService: CurrentUserService,
    private router: Router) { }

  /**
   * used to prevent the application to load entire modules lazily if the user is not authorize to do so.
   * @param route 
   */
  canLoad(route: Route) {
    return true;
  }

  /**
   * used to prevent unauthorized users to access certain routes
   * @param next 
   * @param state 
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.currentUserService.isLoggedIn) {
        if(this.currentUserService.licenseAgreement){
          return true;
        }else{
          this.router.navigate(['/', AppRoutes.LicenseAgreement]);
          return
        }
    }
    this.router.navigate(['/', AppRoutes.Login], { queryParams: { redirectTo: state.url } });
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.canActivate(route, state);
  }
}
