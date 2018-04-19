import { SpinnerService } from './@core/spinner/spinner.service';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ChangeDetectorRef, ViewContainerRef  } from '@angular/core';
import { ScrollService } from './@core/scroll.service';
import { CurrentUserService } from './@core/auth/current-user.service';
import { FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthService } from './@core/auth/api/auth.service';



var spinnerService: SpinnerService
var router: Router;
var cd: ChangeDetectorRef;
var scrollService : ScrollService;
var currentUserService: CurrentUserService;
var formbuilder : FormBuilder;
var toast : ToastsManager;
var viewContainerRef: ViewContainerRef;
var authService : AuthService;

/*  
    THIS IS JUST A SAMPLE TEST TO GET KARMA GOING.
    CAN ERRASE IF NEED BE. - NICK JULY 9 2017
*/

describe('Sample Test', () => {
 it('true is true', () => expect(true).toBe(true));
});

import { AppComponent } from './app.component';

describe('AppComponent', () => {
 beforeEach(function() {
   //this.app = new AppComponent(spinnerService, router, cd, scrollService, currentUserService, formbuilder, bomService, toast, viewContainerRef, authService, customPriceService);
 });

 it('should have hello property', function() {
   expect(this.app.hello).toBe('Hello, World!');
 });
});