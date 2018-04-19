import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
import { JsonServiceClientAuth } from '../../@core/auth/json.service.client.auth'
import { ApiHelper } from '../../@core/api/api.helper';

@Injectable()
export class CurrentUserServiceHelper {

    private searchUrl: string;
    private searchClient: JsonServiceClientAuth;

    constructor(apiHelper: ApiHelper, ) {
        this.searchUrl = apiHelper.getServiceUrl(apiHelper.ServiceNames.search);
        this.searchClient = new JsonServiceClientAuth(this.searchUrl);
    }



    //#endregion
}
