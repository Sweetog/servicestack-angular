import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';


@Component({
    selector: 'ts-number-selector',
    templateUrl: './number-selector.component.html',
    animations: []
})
export class NumberSelectorComponent implements OnInit {

    constructor(){}

    ngOnInit() { }

    @Output() onClickSubtract: EventEmitter<any> = new EventEmitter<any>(); 
    @Output() onClickAdd: EventEmitter<any> = new EventEmitter<any>(); 

}