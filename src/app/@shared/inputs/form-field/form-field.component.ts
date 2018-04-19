import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup, ControlValueAccessor,  NG_VALUE_ACCESSOR } from '@angular/forms';
import { Validator } from '../../../@core/validation/validator';
@Component({
    selector: 'ts-form-field',
    templateUrl: 'form-field.component.html'
})

export class FormField implements OnInit{

    
    constructor() { }

    /**
     * BINDINGS
     */
    @Input() label: string;
    @Input() type: string;
    @Input() validator:Validator;
    @Input() error: string;

    /**
     * FIELDS 
     */
   

    ngOnInit() {}


}