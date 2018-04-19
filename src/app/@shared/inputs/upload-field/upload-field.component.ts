import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup, ControlValueAccessor,  NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
    selector: 'ts-upload-field',
    templateUrl: './upload-field.component.html'
})

export class UploadField implements OnInit{

    /////////////////
    // CONSTRUCTOR //
    /////////////////
    constructor() { }

    //////////////
    // BIINDING //
    //////////////
    @Input() hasError: boolean;
    @Input() messages: any[];
    @Input() type: string;

    @Input() fakeInputValue: string;

    ////////////
    // FIELDS //
    ////////////

    ngOnInit() {
        this.fakeInputValue = "Upload File";
        
        //for some reason this needs to be initiated to false from here. 
        this.hasError = false;
    }


}