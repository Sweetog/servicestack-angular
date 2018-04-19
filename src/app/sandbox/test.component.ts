//Angular
import { Component, OnInit, ViewChild, } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
//Services 
import { CurrentUserService } from '../@core/auth/current-user.service';
import { TokenService } from '../@core/auth/token.service';
import { ApiHelper } from '../@core/api/api.helper';
//animate view
import { PageTransition } from '../animation'
//ServiceStack
import { JsonServiceClient } from '@servicestack/client';
import { GetRssFeed } from '../@core/api/content/dtos';


@Component({
  selector: 'ts-test',
  templateUrl: './test.component.html',
  animations: [PageTransition]
})
export class TestComponent implements OnInit {
  /**
   * Fields
   */
  private client: JsonServiceClient;

  constructor(private apiHelper: ApiHelper,
    private tokenService: TokenService) {
    this.client = new JsonServiceClient(apiHelper.getServiceUrl(apiHelper.ServiceNames.content));

    //refresh token 
    //http://docs.servicestack.net/jwt-authprovider#using-an-alternative-jwt-server
    this.client.refreshTokenUri = this.apiHelper.getServiceUrl(this.apiHelper.ServiceNames.auth) + "/access-token";

    //refresh token is valid, expires in a year
    this.client.refreshToken = "eyJ0eXAiOiJKV1RSIiwiYWxnIjoiSFMyNTYiLCJraWQiOiJNak0ifQ.eyJzdWIiOjgsImlhdCI6MTUyNDE3MzI3MSwiZXhwIjoxNTU1NzA5MjcxfQ.XKVsDKyuCjEKDwfEvM8jSAEh5Cy6tWpQSBwtFPvYpnk";
  }

  ngOnInit() {
    //dto
    var request = new GetRssFeed()

    console.log('----------BEGIN REQUEST----------------');

    this.client.get(request)
      .then(res => {
        console.log('SUCCESS, ServiceStack retrieved bearer token and authenticated', res);
      }, msg => {
        console.log('REJECT', msg);
      })
      .catch(ex => {
        console.log('EXCEPTION', ex);
      });

  }


}
