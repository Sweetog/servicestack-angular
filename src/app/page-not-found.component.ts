import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `<h1> This is the 404</h1>
              <div style="text-align:center">  <img style="width:50%" [src]="pageNotFound" ></div> `
})
export class PageNotFoundComponent implements OnInit { 

    pageNotFound = require ('./assets/images/pagenotfound.png');

    //////////////
    // BINDINGS //
    //////////////
    
    constructor() { }

    ngOnInit() {

    }


    
}

