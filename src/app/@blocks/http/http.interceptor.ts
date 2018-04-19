import { HttpModule, Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

//article that might have some good token handling example code
//http://www.adonespitogo.com/articles/angular-2-extending-http-provider/
export class HttpInterceptor extends Http {

    constructor(backend: XHRBackend, options: RequestOptions) {
        // let token = localStorage.getItem('auth_token'); // your custom token getter function here
        // options.headers.set('Authorization', `Bearer ${token}`);
        super(backend, options);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url, options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
         return observable.catch((err, source) => {
             return Observable.throw(err);
         });
        // return observable.catch((err, source) => {
        //     return Observable.empty();
        //     // if (err.status  == 401 && !_.endsWith(err.url, 'api/auth/login')) {
        //     //     this._router.navigate(['/login']);
        //     //     return Observable.empty();
        //     // } else {
        //     //     return Observable.throw(err);
        //     // }
        // });

    }

    private catchAuthError(self: HttpInterceptor) {
        // we have to pass HttpService's own instance here as `self`
        return (res: Response) => {
            console.log(res);
            if (res.status === 401 || res.status === 403) {
                // if not authenticated
                console.log(res);
            }
            return Observable.throw(res);
        };
    }
}
