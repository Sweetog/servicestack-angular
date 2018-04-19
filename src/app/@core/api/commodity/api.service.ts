import { Injectable } from '@angular/core';
import { JsonServiceClientAuth } from '../../../@core/auth/json.service.client.auth'
import { ApiHelper } from '../../../@core/api/api.helper'
import { resolve } from 'path';
import { CurrentUserService } from '../../auth/current-user.service';
import { CommodityModel, GetCommodities, GetCommoditiesForManufacturerForDisplay, CommodityTypes } from './dtos';
import { forEach } from '@angular/router/src/utils/collection';
import { ProductFeatures } from '../../auth/api/dtos';
import { IndustryTypes } from '../../enums/industry-types.enum';


@Injectable()
export class CommodityService {
  private baseUrl: string;
  private client: JsonServiceClientAuth;

  constructor(private apiHelper: ApiHelper,
             private currentUserService: CurrentUserService) {
    this.baseUrl = apiHelper.getServiceUrl(apiHelper.ServiceNames.commodity);
    this.client = new JsonServiceClientAuth(this.baseUrl);
  }

  /**
   * getCommodities
   * Get the entire commodity tree for current industry.
   */
  getCommodities(commodityType:CommodityTypes, includeCounts:boolean): Promise<Array<CommodityModel>> {
    let promise = new Promise<Array<CommodityModel>>((resolve, reject) => {

      var req = new GetCommodities();
      req.commodityType = commodityType;
      req.industryId = this.currentUserService.industryId;
      req.includeCounts = includeCounts;
      req.countryCode = this.currentUserService.countryCode;

      // console.log('CommodityService.getCommodities: req:', req);

      this.client.get(req)
        .then(res => {
          // console.log('CommodityService.getCommodities: res:', res);          
          resolve(res);
        }, msg => {
          reject(msg);
        });
    });

    return promise;
  }

  /**
   * getCommoditiesForManufacturer
   * @param companyId 
   * Get the entire commodity tree for current industry and manufacturerCompanyId
   */
  getCommoditiesForManufacturer(companyId: number, includeCounts:boolean): Promise<Array<CommodityModel>> {
    let promise = new Promise<Array<CommodityModel>>((resolve, reject) => {

      if(!companyId){
        reject();
        return;
      } 

      var req = new GetCommoditiesForManufacturerForDisplay();
      req.industryId = this.currentUserService.industryId;
      req.companyId = companyId;
      req.includeCounts = includeCounts;
      req.countryCode = this.currentUserService.countryCode;

      this.client.get(req)
        .then(res => {
          resolve(res);
        }, msg => {
          reject(msg);
        });
    });

    return promise;
  }

  /**
   * getRootCommodities
   * Get root-level commodities for current industry
   * Sorted by displayIndex.
   */
  getRootCommodities(manufacturerCompanyId: number): Promise<Array<CommodityModel>> {
    let promise = new Promise<Array<CommodityModel>>((resolve, reject) => {

      if (manufacturerCompanyId) {
        this.getCommoditiesForManufacturer(manufacturerCompanyId, true)
          .then(res => {
            //console.log('CommodityService.getRootCommodities getCommodities().res:',res);
            // Extract the root commodities from the returned list.
            // HACK: if industry is not ICT, all root commodities have a null/undefined parentCommodityId.
            // If industry = ICT, the root commodities have real parentCommodityIds, since ICT commodities are just a subset of Electrical.
            // The root commodities for ICT are commodityId 257, 291, 1236 (Comm Codes 57000, 63000 and 08000 respectively).  So just look for them directly.
            var rootCommodities = this.currentUserService.industryId == IndustryTypes.Ict
              ? res.filter(comm => comm.commodityId == 257 || comm.commodityId == 291 || comm.commodityId == 1236) // the ICT way.
              : res.filter(comm => comm.parentCommodityId === undefined); // the everything else way.
            // console.log('CommodityService.getRootCommodities filtered to root only:',rootCommodities);
            rootCommodities = rootCommodities.sort((c1, c2) => { return c1.displayIndex < c2.displayIndex ? -1 : c1.displayIndex > c2.displayIndex ? 1 : 0 });
            // console.log('CommodityService.getRootCommodities sorted:',rootCommodities);
            resolve(rootCommodities);
          }, msg => {
            reject(msg);
          });
      }
      else {
        this.getCommodities(CommodityTypes.Standard, true)
          .then(res => {
            //console.log('CommodityService.getRootCommodities getCommodities().res:',res);
            // Extract the root commodities from the returned list.
            // HACK: if industry is not ICT, all root commodities have a null/undefined parentCommodityId.
            // If industry = ICT, the root commodities have real parentCommodityIds, since ICT commodities are just a subset of Electrical.
            // The root commodities for ICT are commodityId 257, 291, 1236 (Comm Codes 57000, 63000 and 08000 respectively).  So just look for them directly.
            var rootCommodities = this.currentUserService.industryId == IndustryTypes.Ict
              ? res.filter(comm => comm.commodityId == 257 || comm.commodityId == 291 || comm.commodityId == 1236) // the ICT way.
              : res.filter(comm => comm.parentCommodityId === undefined); // the everything else way.
            // console.log('CommodityService.getRootCommodities filtered to root only:',rootCommodities);
            rootCommodities = rootCommodities.sort((c1, c2) => { return c1.displayIndex < c2.displayIndex ? -1 : c1.displayIndex > c2.displayIndex ? 1 : 0 });
            // console.log('CommodityService.getRootCommodities sorted:',rootCommodities);
            resolve(rootCommodities);
          }, msg => {
            reject(msg);
          });
      }
    });

    return promise;
  }

  /**
   * getCommoditiesParentAndChildren
   * Get the commodity, the parent commodity, and the child commodities of the passed-in commodityId for current industry and passed-in commodityId
   * Sorted by displayIndex.
   */
  getCommoditiesParentAndChildren(manufacturerCompanyId: number, commodityId: number): Promise<Array<CommodityModel>> {
    let promise = new Promise<Array<CommodityModel>>((resolve, reject) => {

      if (manufacturerCompanyId) {
        this.getCommoditiesForManufacturer(manufacturerCompanyId, true)
          .then(res => {
            // console.log('CommodityService.getRootCommodities getCommodities().res:',res);
            // Filter to include the parent commodity and the children commodities.
            var filteredCommodities = res.filter(comm => comm.parentCommodityId == commodityId || comm.commodityId == commodityId);
            // console.log('CommodityService.getCommoditiesParentAndChildren filtered to include commodity, and children only:',filteredCommodities);

            // Get the grandparent.  To find the grandparent, we find the parent, then find the commodity where its commodityId = the parent's parentCommodityId
            var grandParentCommodity;
            var parentCommodity = res.find(c => c.commodityId == commodityId);
            if (parentCommodity && parentCommodity.parentCommodityId) {
              // console.log('found parent commodity with a parentCommodityId: ', parentCommodity);
              grandParentCommodity = res.find(c => c.commodityId == parentCommodity.parentCommodityId);
              if (grandParentCommodity) {
                // console.log('found grandparent commodity: ', grandParentCommodity);
                filteredCommodities.push(grandParentCommodity);
              }
            }
            filteredCommodities = filteredCommodities.sort((c1, c2) => { return c1.displayIndex < c2.displayIndex ? -1 : c1.displayIndex > c2.displayIndex ? 1 : 0 });
            // console.log('CommodityService.getCommoditiesParentAndChildren filtered to include grandparent, commodity, and children only:',filteredCommodities);
            resolve(filteredCommodities);
          }, msg => {
            reject(msg);
          });      }
      else {
        this.getCommodities(CommodityTypes.Standard, true)
          .then(res => {
            // console.log('CommodityService.getRootCommodities getCommodities().res:',res);
            // Filter to include the parent commodity and the children commodities.
            var filteredCommodities = res.filter(comm => comm.parentCommodityId == commodityId || comm.commodityId == commodityId);
            // console.log('CommodityService.getCommoditiesParentAndChildren filtered to include commodity, and children only:',filteredCommodities);

            // Get the grandparent.  To find the grandparent, we find the parent, then find the commodity where its commodityId = the parent's parentCommodityId
            var grandParentCommodity;
            var parentCommodity = res.find(c => c.commodityId == commodityId);
            if (parentCommodity && parentCommodity.parentCommodityId) {
              // console.log('found parent commodity with a parentCommodityId: ', parentCommodity);
              grandParentCommodity = res.find(c => c.commodityId == parentCommodity.parentCommodityId);
              if (grandParentCommodity) {
                // console.log('found grandparent commodity: ', grandParentCommodity);
                filteredCommodities.push(grandParentCommodity);
              }
            }
            filteredCommodities = filteredCommodities.sort((c1, c2) => { return c1.displayIndex < c2.displayIndex ? -1 : c1.displayIndex > c2.displayIndex ? 1 : 0 });
            // console.log('CommodityService.getCommoditiesParentAndChildren filtered to include grandparent, commodity, and children only:',filteredCommodities);
            resolve(filteredCommodities);
          }, msg => {
            reject(msg);
          });
      }
    });

    return promise;
  }
}
