import { Route, PreloadingStrategy } from '@angular/router';
import { Observable } from 'rxjs/Observable';

//add  data: {preload: true} to lazy loaded module routes that you would like preloaded
export class PreloadSelectedModulesList implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
        return route.data && route.data.preload ? load() : null; //: of(null)
    }
}