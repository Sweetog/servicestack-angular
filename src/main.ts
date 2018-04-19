//CSS STYLES
import './styles';
import 'reflect-metadata';
//Zone JS is required by Angular itself.
import 'zone.js/dist/zone';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';


//remaining in ProdMode even in dev because of  ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked errors
//http://www.allenhashkey.com/web-development/angular2/angular-2-expression-changed-after-it-has-been-checked-exception/
enableProdMode();
// if (!AppConfig.isDevelopment) {
//     enableProdMode();
// }


platformBrowserDynamic().bootstrapModule(AppModule)
    .then(success => console.log('Bootstrap success'))
    .catch(err => console.error("Bootstrap module failure: ", err));
