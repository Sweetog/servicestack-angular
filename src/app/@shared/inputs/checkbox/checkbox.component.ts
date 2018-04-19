import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ts-checkbox',
    templateUrl: 'checkbox.component.html'
})

export class Checkbox implements OnInit {

    /////////////////
    // CONSTRUCTOR //
    /////////////////
    constructor() { }

    //////////////
    // BINDINGS //
    //////////////
    @Input() cssId: string;
    @Output() onChecked: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() checked: boolean;


    ////////////
    // FIELDS //
    ////////////


    ngOnInit() { }

    handleCheck(checked: boolean): void {
        //what we are sending to the event handler that is being passed to parent function.
        this.onChecked.emit(checked);
    }



}

   