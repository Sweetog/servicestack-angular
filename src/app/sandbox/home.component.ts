import { Component, OnInit, AfterViewInit } from '@angular/core';

//Animations
import { Animate } from '../@core/const/animation.const';
import {PageTransition } from '../animation';
//Services 
import { SpinnerService } from '../@core/spinner/spinner.service';
import { ScrollService } from '../@core/scroll.service';

@Component({
    templateUrl: './home.component.html',
    animations: [PageTransition]
})
export class HomeComponent implements OnInit, AfterViewInit {

    constructor(private spinnerService: SpinnerService,
                public scrollService : ScrollService ) {}

    // Fields
    state: string = Animate.in;

     ngAfterViewInit(){
        
     }

    ngOnInit() { 
        //view animations.
        this.state = (this.state === Animate.in ? Animate.out : Animate.in);

        //http call starts
        this.spinnerService.display(true);
        //http call ends
        setTimeout(() => {
            this.spinnerService.display(false);
        }, 2000); 

    }

}