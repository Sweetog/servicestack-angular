import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup, ControlValueAccessor,  NG_VALUE_ACCESSOR } from '@angular/forms';
import { Validator } from '../../../@core/validation/validator';

@Component({
    selector: 'ts-textarea-field',
    templateUrl: './textarea-field.component.html'
})

export class TextareaField implements OnInit{
  
    constructor() { }

    /**
     * BIINDINGs
     */
    @Input() label: string;
    @Input() type: string;
    @Input() validator:Validator;

    /**
     * FIELDS
     */

  
    ngOnInit() {}


}