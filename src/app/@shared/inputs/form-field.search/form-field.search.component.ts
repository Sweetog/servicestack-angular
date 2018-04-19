import { Component, OnInit, EventEmitter, Input, Output, ViewChild, Pipe, PipeTransform} from '@angular/core';
import { FormControl, FormGroup, ControlValueAccessor,  NG_VALUE_ACCESSOR } from '@angular/forms';
import { Animate } from '../../../@core/const/animation.const';
import { ShowHideTriggerBlock } from '../../../animation';
import { Validator } from '../../../@core/validation/validator';
//Child Accessors
import { BoxField } from '../box-field/box-field.component';
//Pipes
import { FormFieldSelectViewModel } from '../../../@core/view-models/form-field-select.viewmodel';

@Component({
    selector: 'ts-form-field-search',
    templateUrl: 'form-field.search.component.html',
    animations: [ ShowHideTriggerBlock ]
})


export class FormFieldSearch implements OnInit{    constructor() { }

    /**
     * BINDING
     */
    @Input() items: Array<FormFieldSelectViewModel>;
    @Input() label: string;
    @Input() type: string;
    @Input() validator:Validator;
    @Input() block: boolean;// Set "true" if you want the drop down element to take up space in the dom.
    @Output() onSetInputValue: EventEmitter<FormFieldSelectViewModel> = new EventEmitter<FormFieldSelectViewModel>(); 
    @ViewChild( BoxField ) boxField:BoxField;

    /**
     * FIELDS
     */
    private dropdownVar: string = Animate.hide;
    private searchFilterValue:string = '';

    ngOnInit() {
    }

    private clickInput(){
        this.dropdownVar = Animate.show;
    }

    private closeSearch(item){
        if(item){
            this.onSetInputValue.emit(item);
        }
        this.dropdownVar = Animate.hide;
        this.boxField.setValue('');
        this.searchFilterValue = '';
    }

    private onChange(selected){
        console.log('form-field.search.component onChange()', selected);
    }

    focusBoxInput(e){
        if(e.toState == 'show'){
            this.boxField.focusInput();
        }
    }

}