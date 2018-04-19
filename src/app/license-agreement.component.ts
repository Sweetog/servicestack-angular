import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Params } from '@angular/router';
import { Animate } from './@core/const/animation.const';
import { PageTransition } from './animation';
import { CurrentUserService } from './@core/auth/current-user.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppRoutes } from './@core/const/routes/app-routes.const'

@Component({
    templateUrl: './license-agreement.component.html',
    animations: [PageTransition]
})
export class LicenseAgreementComponent implements OnInit {

    private state: string = Animate.in;//Animate
  
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastsManager,
        private currentUserService: CurrentUserService,
        private vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        //view animations.
        this.state = (this.state === Animate.in ? Animate.out : Animate.in);
        
        if(this.currentUserService.licenseAgreement){
            this.router.navigate(['/', AppRoutes.Dashboard]);

        }
    }

    private onCancel(){
        this.currentUserService.logout();
    }

    private onConfirm(){
        // do the confirm 
    }

}
