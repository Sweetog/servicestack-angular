import { Injectable } from '@angular/core';
import { JsonServiceClient } from '@servicestack/client';
import { Authenticate, AuthenticateResponse } from './dtos';
import { ApiHelper } from '../../../@core/api/api.helper'
import { TokenService } from '../token.service'
import { AppModule } from '../../../app.module';
import { Subject } from "rxjs/Subject";



@Injectable()
export class AuthService {
  private baseUrl: string;
  private client: JsonServiceClient;
  private tokenService: TokenService;
  public loginSuccess = new Subject();

  constructor(private apiHelper: ApiHelper) {
    this.baseUrl = apiHelper.getServiceUrl(apiHelper.ServiceNames.auth);
    this.client = new JsonServiceClient(this.baseUrl);
    this.tokenService = AppModule.injector.get(TokenService);
  }

  /**
 * @method authenticate
 * @param username
 * @param password 
 * @return {Promise<boolean>}
 */
  authenticate(userName: string, password: string): Promise<boolean> {
    let promise = new Promise<boolean>((resolve, reject) => {
      var request = new Authenticate();
      request.provider = "credentials";
      request.userName = userName;
      request.password = password;

      this.client.post(request)
        .then(res => {
          if (res.bearerToken != null) {
            this.tokenService.refreshToken = res.refreshToken;
            this.tokenService.bearerToken = res.bearerToken;
            this.loginSuccess.next(true);
            resolve(true);
          }
          resolve(false);
        }, msg => {
          console.log('login failed', msg);
          reject(msg);
        })
    });

    return promise;
  }

  logout(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      var request = new Authenticate();
      request.provider = "logout";

      this.client.post(request)
        .then(res => {
          resolve();
          //console.log('AuthService.logout.success');
          this.tokenService.clearTokens();
        }, msg => {
          //console.log('AuthService.logoutfailed', msg);
          reject(msg);
        })
        .catch(ex => reject(ex))
    });

    return promise;
  }



}