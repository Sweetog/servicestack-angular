import { Injectable } from '@angular/core';
import { ServiceNames } from '../const/service.names.const';
import { CurrentUserService } from '../../@core/auth/current-user.service'

@Injectable()
export class ApiHelper {

    /**
     * Convenience Property Exposing ServiceNames const
     */
    public ServiceNames = ServiceNames;

    /**
     * @method getServiceUrl
     * @param serviceName
     * @return {string}
     */
    getServiceUrl(serviceName: string): string {
        return AppConfig.services[serviceName];
    }

    convertUrlToHttps(url: string) {
        if (url && url.indexOf('http') != -1) {
            return "https" + url.substring(4);
        }else{
            return url;
        }
    }
}
