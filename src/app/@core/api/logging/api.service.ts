import { Injectable } from '@angular/core';
import { JsonServiceClientAuth } from '../../../@core/auth/json.service.client.auth'
import { ApiHelper } from '../../../@core/api/api.helper'
import { resolve } from 'path';
import { CorrespondenceTypes } from '../../enums/correspondence-types.enum'
import { TimeService } from '../../../@core/time.service';
import { CurrentUserService } from '../../../@core/auth/current-user.service';
import { GetDistributorPriceFileSummary, DistributorPriceFileSummaryModel, PriceRequestSummaryModel, GetDistributorPriceRequestSummary, GetContractorPriceRequestSummary, GetContractorJobSummary, JobsSummaryModel, FullResponseModel, GetJobFullResponse } from './dtos';
@Injectable()
export class LoggingService {
    private baseUrl: string;
    private client: JsonServiceClientAuth;

    constructor(apiHelper: ApiHelper,
        private timeService: TimeService,
        private currentUserService: CurrentUserService) {
        this.baseUrl = apiHelper.getServiceUrl(apiHelper.ServiceNames.logging);
        this.client = new JsonServiceClientAuth(this.baseUrl);
    }

    getJobFullResponse(jobId: number, byUpc: string = null, byManufacturerName: string = null, byCatalogCode: string = null){
      let promise = new Promise<Array<FullResponseModel>>((resolve, reject) => {

        console.log('getJobFullResponse');
        console.log('byUpc', byUpc);
        console.log('byManufacturerName', byManufacturerName);
        console.log('byCatalogCode', byCatalogCode);
        var req = new GetJobFullResponse();
        req.jobId = jobId;
        req.byUpc = byUpc;
        req.byManufacturerName = byManufacturerName;
        req.byCatalogCode = byCatalogCode;
  
        this.client.get(req)
          .then(res => {
            resolve(res);
          }, msg => {
            reject(msg);
          })
      });
  
      return promise;
    } 

    getContractorJobSummary(distributorCompanyId: number, contractorCompanyId: number, byJobId: string = null, byJobName: string = null): Promise<Array<JobsSummaryModel>>{
      let promise = new Promise<Array<JobsSummaryModel>>((resolve, reject) => {

        var req = new GetContractorJobSummary();
        req.distributorCompanyId = distributorCompanyId;
        req.contractorCompanyId = contractorCompanyId;
        req.byJobId = byJobId;
        req.byJobName = byJobName;
  
        this.client.get(req)
          .then(res => {
            resolve(res);
          }, msg => {
            reject(msg);
          })
      });
  
      return promise;
    }

    getDistributorPriceFilesSummary(): Promise<Array<DistributorPriceFileSummaryModel>> {
        let promise = new Promise<Array<DistributorPriceFileSummaryModel>>((resolve, reject) => {

          var req = new GetDistributorPriceFileSummary();
    
          this.client.get(req)
            .then(res => {
              resolve(res);
            }, msg => {
              reject(msg);
            })
        });
    
        return promise;
      }

      getDistributorPriceRequestSummary(byCompanyId: string = null, byCompanyName: string = null): Promise<Array<PriceRequestSummaryModel>> {
        let promise = new Promise<Array<PriceRequestSummaryModel>>((resolve, reject) => {

          var req = new GetDistributorPriceRequestSummary();
          req.byCompanyId = byCompanyId;
          req.byCompanyName = byCompanyName;
    
          this.client.get(req)
            .then(res => {
              resolve(res);
            }, msg => {
              reject(msg);
            })
        });
    
        return promise;
      }

      getContractorPriceRequestSummary(distributorCompanyId: number, byCompanyId: string = null, byCompanyName: string = null): Promise<Array<PriceRequestSummaryModel>> {
        let promise = new Promise<Array<PriceRequestSummaryModel>>((resolve, reject) => {

          var req = new GetContractorPriceRequestSummary();
          req.distributorCompanyId = distributorCompanyId;
          req.byCompanyId = byCompanyId;
          req.byCompanyName = byCompanyName;
    
          this.client.get(req)
            .then(res => {
              resolve(res);
            }, msg => {
              reject(msg);
            })
        });
    
        return promise;
      }


}