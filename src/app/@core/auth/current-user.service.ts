import { Injectable, EventEmitter, Injector } from '@angular/core';
import { TokenService } from '../auth/token.service';
import { CompanyTypes } from '../enums/company-types.enum';
import { IndustryTypes } from '../enums/industry-types.enum';
import { TimeService } from '../../@core/time.service';
import { Subject } from 'rxjs/Subject';
import { AuthService } from './api/auth.service';
import { UserRoleTypes, Products, ProductFeatures } from './api/dtos';
import { resolve } from 'path';
import { AppModule } from '../../app.module';
import { ItemSearchInterfaces as ItemSearchInterfacesConstant } from '../const/item-search-interfaces.const';
import { UserRoleViewModel } from '../view-models/user-role.viewmodel';
import { userInfo } from 'os';
import { CurrentUserServiceHelper } from './current-user-service.helper';

@Injectable()
export class CurrentUserService {
  private readonly _industryIdKey = 'industry_id';
  private readonly _itemSearchInterfacesKey = 'item_search_interfaces_id';
  private readonly _priceSettingsKey = 'price_settings';
  private readonly _timeZoneKey = 'time_zone';
  private readonly _currentItemSearchKey = 'current_item_search';
  private readonly _lastItemXRefsRequestKey = 'last_item_xref_request';
  private readonly _searchColumnsSettingsKey = 'search_columns_settings';
  private readonly _searchResultCardViewDisplayKey = 'search_result_cartview_display';



  constructor(private tokenService: TokenService,
    private timeService: TimeService,
    private authService: AuthService,
    private currentUserServiceHelper: CurrentUserServiceHelper,
    private injector: Injector) {
    //load important data for session here, you must use CurrentUserServiceHelper for ajax requests to APIs
    //this is because all API Services on the frontend have a dependency or perhaps will have a dependency CurrentUserService
    //this causes a cyclical dependency thus CurrentUserServiceHelper must be used
  }

  /**
   * Call this function to refresh the session frontend after the user has updated their profile or zip code or display settings
   */
  public refreshSession() {
    //TODO: Clear User Profile properties

    //removing the bearer token will force any api to refresh the bearer token with the latest database values
    this.tokenService.clearBearerToken();
  }


  public logout(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.authService.logout()
        .then(resp => {
          localStorage.clear()
          resolve()
        }, msg => reject())
        .catch(ex => reject())
    });

    return promise;
  }

  public get isDistributor(): boolean {
    return (this.companyTypeId === CompanyTypes.Distributor)
  }

  public get isContractor(): boolean {
    return (this.companyTypeId === CompanyTypes.Contractor)
  }


  public get isManufacturer(): boolean {
    return (this.companyTypeId === CompanyTypes.Manufacturer)
  }

  public get companyTypeDisplay(): string {
    switch (this.companyTypeId) {
      case CompanyTypes.Contractor:
        return "Contractor";
      case CompanyTypes.Distributor:
        return "Distributor";
      case CompanyTypes.Manufacturer:
        return "Manufacturer";
      case CompanyTypes.Internal:
        return "Internal"
      default:
        return "Unknown";
    }
  }

  //#region Card/List View Display

  public get searchResultCardViewDisplay(): boolean {

    var settings = localStorage.getItem(this._searchResultCardViewDisplayKey);
    var retValue = true;
    if (settings) {
      var parsedSettings = parsedSettings = JSON.parse(settings);

      if (parsedSettings) {
        retValue = parsedSettings;
        return retValue;
      }
    }
    //console.error('local stored search Columns Settings request failed to parse');
  }

  public set searchResultCardViewDisplay(value: boolean) {
    localStorage.setItem(this._searchResultCardViewDisplayKey, JSON.stringify(value));
  }

  //#endregion
  
  public removeCurrnentItemSearchRequest(): void {
    localStorage.removeItem(this._currentItemSearchKey);
  }

  private getCountryCodeFromPostalCode(): string {
    var isValidUsaZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.postalCode[0]);
    var isValidCanadaPostalCode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(this.postalCode[0]);

    return isValidUsaZip ? "USA" : isValidCanadaPostalCode ? "CAN" : "USA";
  }

  //#endregion

  public isElectricalContractor(): boolean {
    return this.isIndustryElectrical && this.isContractor === true;
  }

  public isElectricalDistributor(): boolean {
    return this.isIndustryElectrical && this.isDistributor === true;
  }

  public isPlumbingContractor(): boolean {
    return this.isIndustryPlumbing && this.isContractor === true;
  }

  public isPlumbingDistributor(): boolean {
    return this.isIndustryPlumbing && this.isDistributor === true;
  }

  public get isIndustryElectrical(): boolean {
    var industryId = Number(localStorage.getItem(this._industryIdKey));

    return IndustryTypes.Electrical === industryId;
  }

  public get isIndustryPlumbing(): boolean {
    var industryId = this.industryId;

    return IndustryTypes.Plumbing === industryId;
  }

  public get isIndustryIct(): boolean {
    var industryId = this.industryId;

    return IndustryTypes.Ict === industryId;
  }

  public get isIndustryHvac(): boolean {
    var industryId = this.industryId;

    return IndustryTypes.Hvacr === industryId;
  }

  public get allIndustries(): Array<IndustryTypes> {
    let ret = new Array<IndustryTypes>();
    console.log('TODO: all industries mocked, need to add to token');
    ret.push(IndustryTypes.Electrical)
    return ret;
  }

  //#region Traser Available Indutries and Selected Industry Id

  public get traserIndustries(): Array<IndustryTypes> {
    let ret = new Array<IndustryTypes>();

    if (this.hasProductFeatureEntitlement(ProductFeatures.TraserSX_Electrical))
      ret.push(IndustryTypes.Electrical);

    if (this.hasProductFeatureEntitlement(ProductFeatures.TraserSX_Plumbing))
      ret.push(IndustryTypes.Plumbing);
    else if (this.hasProductFeatureEntitlement(ProductFeatures.TraserSX_HVACR))
      ret.push(IndustryTypes.Plumbing);

    if (this.hasProductFeatureEntitlement(ProductFeatures.TraserSX_ICT))
      ret.push(IndustryTypes.Ict);

    return ret;
  }




  public getIndustryTypeDisplayName(id: IndustryTypes): string {
    var retValue = '';
    switch (+id) {
      case IndustryTypes.Electrical:
        retValue = 'Electrical';
        break;
      case IndustryTypes.Plumbing:
        retValue = 'Plumbing';
        break;
      case IndustryTypes.Hvacr:
        retValue = 'HVACR';
        break;
      case IndustryTypes.Ict:
        retValue = 'ICT';
        break;
    }

    return retValue;
  }

  //#endregion

  /**
   * industryIdChanged subject
   * subscribe to it if you want to be notified when insustryId changes.
   */
  public industryIdChanged = new Subject<IndustryTypes>();

  public get industryId(): IndustryTypes {
    var industryId = localStorage.getItem(this._industryIdKey);
    var allApplicableIndustries = this.traserIndustries;

    //--- Get first applicable user industry if no industry stored
    if (!industryId && allApplicableIndustries) {
      industryId = String(allApplicableIndustries[0]);
      this.industryId = <IndustryTypes>(+industryId);
    }

    //--- Check if current selected industry is applicable for user
    if (industryId && allApplicableIndustries) {
      if (!(allApplicableIndustries.indexOf(+industryId) > -1))
        industryId = String(allApplicableIndustries[0]);
    }

    if (!industryId) {
      console.log('electical industry mocked because industry not choosen by user');
      return IndustryTypes.Electrical;
    }
    return Number(industryId);
  }

  public set industryId(value: IndustryTypes) {
    localStorage.setItem(this._industryIdKey, String(value));
    this.industryIdChanged.next(value);
  }


  public get timeZone(): string {
    var tz = localStorage.getItem(this._timeZoneKey);
    if (!tz) {
      tz = this.timeService.getLocalTimeZone();
      localStorage.setItem(this._timeZoneKey, tz);
    }
    return tz;
  }

  public hasAnyProductFeatureEntitlements(productFeatures: Array<ProductFeatures>) {
    if (!productFeatures || !productFeatures.length) return false;

    for (var i = 0; i < productFeatures.length; i++) {
      if (this.hasProductFeatureEntitlement(productFeatures[i])) {
        return true;
      }
    }
  }

  /**
   * Product Entitlements
   * @param product 
   */
  public hasProductEntitlement(product: Products) {
    let products = this.productEntitlements;

    if (!products && !products.length) return false;

    var result = products.filter(p => p == product);

    if (result && result.length) {
      return true;
    }

    return false;
  }

  /**
   * Product Feature Entitlements
   * @param productFeature 
   */
  public hasProductFeatureEntitlement(productFeature: ProductFeatures) {
    let productFeatures = this.productFeatureEntitlements;

    if (!productFeatures && !productFeatures.length) return false;

    var result = productFeatures.filter(p => p == productFeature);

    if (result && result.length) {
      return true;
    }

    return false;
  }

  public isInUserRole(userRoleTypeId: UserRoleTypes): boolean {
    let userRoles = this.userRoles;

    if (!userRoles && !userRoles.length) return false;


    let result = userRoles.filter(ur => ur.userRoleType == userRoleTypeId);

    if (result && result.length) {
      return true;
    }

    return false;
  }

  public get isCompanyAdministrator(): boolean {
    let userRoles = this.userRoles;

    if (!userRoles && !userRoles.length) return false;
    if (!this.companyTypeId) return false;

    let retValue = false;
    switch (+this.companyTypeId) {
      case CompanyTypes.Internal:
        retValue = this.isInUserRole(UserRoleTypes.AdministratorInternal);
        break;
      case CompanyTypes.Manufacturer:
        retValue = this.isInUserRole(UserRoleTypes.AdministratorManufacturer);
        break;
      case CompanyTypes.Contractor:
        retValue = this.isInUserRole(UserRoleTypes.AdministratorContractor);
        break;
      case CompanyTypes.Distributor:
        retValue = this.isInUserRole(UserRoleTypes.AdministratorDistributor);
        break;
    }

    return retValue;
  }

  public get isLoggedIn(): boolean {
    return !this.tokenService.isRefreshTokenExpired();
  }

  public get userRoles(): Array<UserRoleViewModel> {
    //structure of UserRoles string example: "2:0,3:0"
    var ret = new Array<UserRoleViewModel>();
    let userRoles = this.getTokenValue('userRoles');

    if (!userRoles) return ret;

    var uRArr = userRoles.split(',');

    if (!uRArr || !uRArr.length) return ret;

    for (var i = 0; i < uRArr.length; i++) {
      var currentArr = uRArr[i].split(':');
      var t = new UserRoleViewModel();
      t.userRoleType = currentArr[0];
      t.isRecursive = (currentArr[1] == "1") ? true : false;
      t.displayName = this.getUserRoleDisplayName(t.userRoleType);
      ret.push(t);
    }

    return ret;
  }

  public getUserRoleDisplayName(userRoleType: UserRoleTypes): string {
    let retValue = 'n/a';
    switch (+userRoleType) {
      case UserRoleTypes.StandardUserInternal:
        retValue = 'Internal Standard User';
        break;
      case UserRoleTypes.AdministratorInternal:
        retValue = 'Internal Administrator';
        break;

      case UserRoleTypes.StandardUserContractor:
        retValue = 'Contractor Standard User';
        break;
      case UserRoleTypes.AdministratorContractor:
        retValue = 'Contractor Administrator';
        break;

      case UserRoleTypes.StandardUserDistributor:
        retValue = 'Distributor Standard User';
        break;
      case UserRoleTypes.AdministratorDistributor:
        retValue = 'Distributor Administrator';
        break;


      case UserRoleTypes.PriceColumnMaintenance:
        retValue = 'Distributor Price Column Maintenance';
        break;
      case UserRoleTypes.PriceColumnAssignment:
        retValue = 'Distributor Price Column Assignment';
        break;
      case UserRoleTypes.ContractorStatusing:
        retValue = 'Contractor Statusing';
        break;

      case UserRoleTypes.StandardUserManufacturer:
        retValue = 'Manufacturer Standard User';
        break;
      case UserRoleTypes.AdministratorManufacturer:
        retValue = 'Manufacturer Administrator';
        break;
      case UserRoleTypes.Sales:
        retValue = 'Sales';
        break;
      case UserRoleTypes.WebContentEditor:
        retValue = 'Web Content Editor';
        break;

      case UserRoleTypes.System:
        retValue = 'System - Internal';
        break;
      case UserRoleTypes.GlobalCrossReferenceAdmin:
        retValue = 'Distributor - Global Cross-Reference Admin';
        break;
      case UserRoleTypes.CustomerSupport:
        retValue = 'Customer Support';
        break;
    }
    //console.log('userRoleType: ' + userRoleType + ' = '+retValue);
    return retValue;
  }



  public get displayName(): string {
    return this.getTokenValue('given_name') + ' ' + this.getTokenValue('family_name');
  }

  public get firstName(): string {
    return this.getTokenValue('given_name');
  }

  public get lastName(): string {
    return this.getTokenValue('family_name');
  }

  public get companyId(): number {
    return this.getTokenValue('companyId') as number;
  }

  public get companyTypeId(): number {
    return this.getTokenValue('companyTypeId') as number;
  }

  public get email(): string {
    return this.getTokenValue('email');
  }

  public get productEntitlements(): Array<Products> {
    var productIds = this.getTokenValue('productIds');

    if (!productIds) {
      return new Array<Products>();
    }

    return productIds.split(',');
  }

  public get productFeatureEntitlements(): Array<ProductFeatures> {
    var productFeatureIds = this.getTokenValue('productFeatureIds');

    if (!productFeatureIds) {
      return new Array<ProductFeatures>();
    }

    return productFeatureIds.split(',');
  }

  public get postalCode(): Array<string> {
    return this.getTokenValue('postalCode');
  }

  public get userId(): Array<string> {
    return this.getTokenValue('sub');
  }

  public get countryCode(): string {
    var hasTsxUsa = this.hasProductFeatureEntitlement(ProductFeatures.TraserSX_Country_US);
    var hasTsxCanada = this.hasProductFeatureEntitlement(ProductFeatures.TraserSX_Country_Canada);
    var countryCode = hasTsxUsa && !hasTsxCanada ? "USA" : // only USA
      hasTsxCanada && !hasTsxUsa ? "CAN" : // only Canada
        hasTsxCanada && hasTsxUsa ? this.getCountryCodeFromPostalCode() : // user has both, so check current postal code.
          "USA"; // default
    return countryCode;
  }

  private getTokenValue(key: string) {
    var token = this.tokenService.decodeBearerToken();
    if (!token) {
      return null;
    }

    return token[key];
  }

  public get licenseAgreement():boolean{
    // Need to check if the user has concented to the license agreement. 

    // set as false to see work . 
    return true
  }

}
