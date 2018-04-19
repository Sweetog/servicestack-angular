import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup, ControlValueAccessor,  NG_VALUE_ACCESSOR } from '@angular/forms';
import { Validator } from '../../../@core/validation/validator';

@Component({
    selector: 'ts-select-field',
    templateUrl: 'select-field.component.html'
})

export class SelectField implements OnInit{

    constructor() { }

    /**
     * BINDINGS
     */
    @Input() label: string;
    @Input() hasError: boolean;
    @Input() validator:Validator;
    
    ngOnInit() {

    }
}