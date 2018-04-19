import { Injectable } from '@angular/core';
import { JsonServiceClientAuth } from '../../../@core/auth/json.service.client.auth'
import { ApiHelper } from '../../../@core/api/api.helper'
import { resolve } from 'path';
import { CurrentUserService } from '../../auth/current-user.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ProductFeatures } from '../../auth/api/dtos';
import { IndustryTypes } from '../../enums/industry-types.enum';
import { CopperPriceModel, GetCopperPricing, RssFeedItem, GetRssFeed } from './dtos';


@Injectable()
export class ContentService {
  private baseUrl: string;
  private client: JsonServiceClientAuth;

  constructor(private apiHelper: ApiHelper,
    private currentUserService: CurrentUserService) {
    this.baseUrl = apiHelper.getServiceUrl(apiHelper.ServiceNames.content);
    this.client = new JsonServiceClientAuth(this.baseUrl);
  }

  getRssFeed(): Promise<Array<RssFeedItem>> {
    let promise = new Promise<Array<RssFeedItem>>((resolve, reject) => {

      var req = new GetRssFeed();

      this.client.get(req)
        .then(res => {
          if (AppConfig.isDevelopment) {
            for (var i = 0; i < res.length; i++) {
              //convert to https
              res[i].url = this.apiHelper.convertUrlToHttps(res[i].url);
            }
          }
          resolve(res)
        }, msg => {
          console.log('ContentService.getRssFeed.reject', msg);
          reject(msg);
        })
        .catch(ex => {
          console.log('ContentService.getRssFeed.ex', ex);
        });

    });

    return promise;
  }

  /**
   * 
   * @param beginDate 
   * @param endDate 
   */
  getCopperPricing(beginDate: string, endDate: string): Promise<Array<CopperPriceModel>> {
    let promise = new Promise<Array<CopperPriceModel>>((resolve, reject) => {

      var req = new GetCopperPricing();
      req.beginDate = new Date(beginDate).toDateString();
      req.endDate = new Date(endDate).toDateString();

      this.client.get(req)
        .then(res => {
          resolve(res)
        }, msg => {
          console.log('ContentService.getCopperPricing.reject', msg);
          reject(msg);
        })
        .catch(ex => {
          console.log('ContentService.getCopperPricing.ex', ex);
        });
    });

    return promise;
  }
}
