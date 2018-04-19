import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products, ProductFeatures, UserRoleTypes } from './@core/auth/api/dtos';
import { ProductFeaturesDisplay } from './@core/const/product-features-display.const';
import { ProductsDisplay } from './@core/const/products-display.const';

@Component({
    templateUrl: './not-authorized.component.html'
})
export class NotAuthorizedComponent implements OnInit {
    private background = require('./assets/images/construction-background.jpg');
    private isProduction = AppConfig.isProduction;
    private missingEntitlementIsKnown = false;
    private devDisplayText: string;


    constructor(private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                var productId = params['productId'];
                var productFeatureId = params['productFeatureId'];
                var userRoleId = params['userRoleId'];

                if (!productId) productId = -1;
                if (!productFeatureId) productFeatureId = -1;
                if (!userRoleId) userRoleId = -1;

                this.createDisplayText(+productId, +productFeatureId, +userRoleId);
            }
        );
    }

    private createDisplayText(productId: number, productFeatureId: number, userRoleId: number) {

        if (userRoleId >= 0) {
            switch (userRoleId) {
                case UserRoleTypes.ContractorStatusing:
                    this.devDisplayText = "User Role: Contractor Statusing";
                    break;
                default:
                    this.devDisplayText = "User Role: " + userRoleId;
                    break;
            }

            this.missingEntitlementIsKnown = true;
            return;
        }

        if(productFeatureId >= 0){
            this.devDisplayText = "Product Feature Entitlement: " + ProductFeaturesDisplay[productFeatureId];

            this.missingEntitlementIsKnown = true;
            return;
        }

        if(productId >= 0){
            this.devDisplayText = "Product Entitlement: " + ProductsDisplay[productId];

            this.missingEntitlementIsKnown = true;
            return;
        }

    }

}

