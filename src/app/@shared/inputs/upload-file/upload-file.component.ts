import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup, ControlValueAccessor,  NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
    selector: 'ts-upload-file',
    templateUrl: './upload-file.component.html'
})

export class UploadFile implements OnInit{

  
    constructor() { }

    /**
     * BIINDING
     */
    @Input() uploadedFile: boolean;
    

    /**
     * FIELDS
     */

    ngOnInit() {}
       


}