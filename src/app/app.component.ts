import { Component, ViewChild, OnInit, ChangeDetectorRef, AfterViewInit, ViewContainerRef } from '@angular/core';
import { SpinnerService } from './@core/spinner/spinner.service';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { CurrentUserService } from './@core/auth/current-user.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
// BOM Validation
//Services
import { ScrollService } from './@core/scroll.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthService } from './@core/auth/api/auth.service';

declare var pendo;
//dtos


@Component({
    selector: 'ts-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private spinnerService: SpinnerService,
        private router: Router,
        public cd: ChangeDetectorRef,
        public scrollService: ScrollService,
        public currentUserService: CurrentUserService,
        private fb: FormBuilder,
        public toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private authService: AuthService,) {
        // this.toastr.setRootViewContainerRef(vcr);
    };

    /**
     * BINDINGS 
     */

    /**
     * FIELDS
     */
    showLoader: boolean;
    loggedInElements: boolean;
    //This is just for a Karma test
    private hello: string = 'Hello, World!';
    private wheelbarrow = require('./assets/images/wheelbarrow.png');
    private cardPrompt = require('./assets/images/card-prompt.jpg');
    //Add To BOM Form 
    private addToBomForm: FormGroup;
    // Send to custom price column
    private sortDescending = false;
    private renderScrollbox = true;
    
    
    ngOnInit() {

        // Subscribing to Spinner Service to see if spinner should be showing. 
        this.spinnerService.status.subscribe((val: boolean) => {
            this.showLoader = val;
            this.router.events.filter(event => event instanceof NavigationEnd).subscribe((e: NavigationEnd) => {
                this.scrollService.scrollToTop();
            });
           
        });

    }

    /**
     * Shopping Cart
     */

    // Close Panel
    closeShoppingCartPanelClick(): void {

    }
    // Open Panel
    clickShoppingCart(): void {

    }
    // Delete Item
    deleteCartItemClick(item): void {

    }


    /**
     *   Add To List Actions 
     */

    // Click BOM
    clickBomOption(): void {
        this.closeShoppingCartPanelClick()

    }

    // Click RFQ
    clickRfqOption(): void {
        this.closeShoppingCartPanelClick();
        this.router.navigate(['/supplier-xchange/request-form/0']);  // 0 param tells request-form to use shopping cart items.
    }

    // Click Export
    clickExportOption(): void { 
        // this.spinnerService.display(true);

        // this.spinnerService.display(false);
    }

   

    // Click Custom price column
    clickCustomPriceColumnOption(): void {
        this.renderScrollbox = true;
    }


    /**
    * Add To Bom Side Panel
    */

    //Close Panel
    closeAddToBomPanelClick(): void {
        this.clearAddToBomForm();

    }

    //Clear Form
    clearAddToBomForm(): void {
        let formValue = {};
        //Clear the form here.
        this.addToBomForm.setValue(formValue)
    }

    //Submit BOM Click
    submitAddToBomFormClick(): void {

    }


    public getEditableBoms(): void {

    }



    /**
     * Add to custom price column side panel
     */

      //Close Panel
    closeAddToCustomPriceColumnPanelClick(): void {

        this.renderScrollbox = false;
    }

    // Select Custom Price Column Click
    selectCustomPriceColumn(id): void {

        this.renderScrollbox = false;
        this.router.navigate(['/custom-price-column/' + id + '/item-level-rule/add']);
    }



}// end class

