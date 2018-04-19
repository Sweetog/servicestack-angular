import { Injectable } from '@angular/core';
import { JsonServiceClientAuth } from '../../@core/auth/json.service.client.auth';
import { GetUser, UserModel} from './dtos';
import { ApiHelper } from '../../@core/api/api.helper'



@Injectable()
export class TestService {
  private baseUrl: string;
  private client: JsonServiceClientAuth;

  constructor(apiHelper: ApiHelper) {
    this.baseUrl = "http://localhost:5000";
    this.client = new JsonServiceClientAuth(this.baseUrl);
  }

  /**
   * @method get
   * @param id 
   * @return {Promise<UserModel>}
   */
  get(id: number): Promise<UserModel> {
    let promise = new Promise<UserModel>((resolve, reject) => {
      if (!id) {
        resolve();
      }

      var req = new GetUser();
      req.id = id;

      this.client.get(req)
        .then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        });
    });

    return promise;
  }

}
