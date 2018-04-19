import { JsonServiceClient, IReturn, ErrorResponse } from '@servicestack/client';
//service
import { AuthService } from './api/auth.service';
import { SpinnerService } from '../spinner/spinner.service';
//dtos
import { GetAccessToken, ConvertSessionToToken, ConvertSessionToTokenResponse } from './api/dtos'
import { AppModule } from '../../app.module';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { ApiHelper } from '../api/api.helper';
import { AppRoutes } from '../const/routes/app-routes.const';

export class JsonServiceClientAuth extends JsonServiceClient {

    private router: Router;
    private tokenService: TokenService;
    private apiHelper: ApiHelper;
    private spinnerService: SpinnerService;

    constructor(baseUrl: string) {
        super(baseUrl);

        //Router, TokenService, ApiHelper are not injected via the contructor because clients of JsonServiceClientAuth need to create instances of it as simple as possibl
        this.router = AppModule.injector.get(Router);
        this.tokenService = AppModule.injector.get(TokenService);
        this.apiHelper = AppModule.injector.get(ApiHelper);
        this.spinnerService = AppModule.injector.get(SpinnerService);

        //refresh token 
        //http://docs.servicestack.net/jwt-authprovider#using-an-alternative-jwt-server
        this.refreshTokenUri = this.apiHelper.getServiceUrl(this.apiHelper.ServiceNames.auth) + "/access-token";

        this.onAuthenticationRequired = async () => {
            this.redirectToLogin();
        };
    }

    get<T>(request: IReturn<T> | string, args?: any): Promise<T> {
        this.prepareForRequest();

        let promise = new Promise<T>((resolve, reject) => {
            super.get(request)
                .then(res => {
                    this.handleSuccessfulResponse();
                    resolve(res);
                }, msg => {
                    this.handleCompletion();
                    this.handleRejection(msg);
                    reject(msg);
                })
                .catch(ex => this.handleCompletion(ex))
        });

        return promise;
    }

    post<T>(request: IReturn<T>, args?: any): Promise<T> {
        this.prepareForRequest();

        let promise = new Promise<T>((resolve, reject) => {
            super.post(request)
                .then(res => {
                    this.handleSuccessfulResponse();
                    resolve(res);
                }, msg => {
                    this.handleCompletion();
                    this.handleRejection(msg);
                    reject(msg);
                })
                .catch(ex => this.handleCompletion(ex))
        });

        return promise;
    }

    put<T>(request: IReturn<T>, args?: any): Promise<T> {
        this.prepareForRequest();

        let promise = new Promise<T>((resolve, reject) => {
            super.put(request)
                .then(res => {
                    this.handleSuccessfulResponse();
                    resolve(res);
                }, msg => {
                    this.handleCompletion();
                    this.handleRejection(msg);
                    reject(msg);
                })
                .catch(ex => this.handleCompletion(ex))
        });

        return promise;
    }

    delete<T>(request: IReturn<T>, args?: any): Promise<T> {
        this.prepareForRequest();

        let promise = new Promise<T>((resolve, reject) => {
            super.delete(request)
                .then(res => {
                    this.handleSuccessfulResponse();
                    resolve(res);
                }, msg => {
                    this.handleCompletion();
                    this.handleRejection(msg);
                    reject(msg);
                })
                .catch(ex => this.handleCompletion(ex))
        });

        return promise;
    }

    private handleRefreshTokenException() {
        this.redirectToLogin();
    }

    private handleCompletion(ex: any = null) {
        //hide spinner in case it was showing
        this.spinnerService.display(false);
        if(ex) {
            console.log('JsonServiceClientAuth.handleCompletion: rethrowing exception', ex);
            throw ex;
        }
    }

    private handleRejection(msg: any) {
        if (msg == "TypeError: Failed to fetch"){
            console.error('Failed to fetch: IT IS QUITE POSSIBLE THAT THE API YOU ARE CALLING IS DOWN');
        } 

        if(msg.responseStatus && msg.responseStatus.errorCode === "401"){
            //an API has rejected the request
            console.log('JsonServiceClientAuth.handleRejection: API returned 401 redirect to not authorized');
            this.router.navigate(['/', AppRoutes.NotAuthorized]);
        }

        if (msg.type === "RefreshTokenException") {
            console.log('JsonServiceClientAuth.handleRejection: there was a token refresh exeception');
            this.handleRefreshTokenException();
        }
    }

    private redirectToLogin() {
        this.router.navigate(['/', AppRoutes.Login], { queryParams: { redirectTo: this.router.url } });
    }

    /**
     * cross domain resources require that we explicity set the token in ServiceStack JsonServiceClients
     * https://stackoverflow.com/questions/47422212/use-the-jwt-tokens-across-multiple-domains-with-typescript-jsonserviceclient-s
     */
    private prepareForRequest() {
        //console.log('JsonServiceClientAuth.prepareForRequest');
        //console.log('this.tokenService.refreshToken', this.tokenService.refreshToken);
        this.refreshToken = this.tokenService.refreshToken;
        this.bearerToken = this.tokenService.bearerToken;
    }

    /**
     * refresh the bearer token with the latest data, every request is passed with the refresh token and the freshest bearerToken will be
     * returned with every response
     */
    private handleSuccessfulResponse() {
        //console.log('JsonServiceClientAuth.handleSuccessfulResponse');
        //console.log('this.bearerToken', this.bearerToken);
        //this will update the client side bearerToken, keeping it fresher - Ogden 4-18-2018
        this.tokenService.bearerToken = this.bearerToken;
    }
}