import { Injectable } from '@angular/core';


@Injectable()
export class GenerateStringService {

    //Inject the http service
    constructor() {}
    
    generateString(){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
    }

} 