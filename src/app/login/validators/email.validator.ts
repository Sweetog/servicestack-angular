import { Validators } from '@angular/forms'; 
import { Validator } from '../../@core/validation/validator' 
 
/** 
 * Validator for the Email property of the Login form 
 * @class EmailValidator 
 */ 
export class EmailValidator extends Validator { 
 
    constructor() { 
        super(); 
    } 
 
    private _minLength: number = 5; 
    private _maxLength: number = 100; 
    private _controlName: string = "email"; 
    private _rules: Array<Validators> = [Validators.required, Validators.minLength(this._minLength), Validators.maxLength(this._maxLength)]; 
 
    private _messageTemplates: Object = { 
        required: this.validationMessageService.required(this._controlName), 
        minlength: this.validationMessageService.minLength(this._controlName, this._minLength), 
        maxlength: this.validationMessageService.maxLength(this._controlName, this._maxLength) 
    } 
 
    public get controlName(): string { 
        return this._controlName; 
    } 
 
    public get messageTemplates(): Object { 
        return this._messageTemplates; 
    } 
 
    public get rules(): Array<Validators> { 
        return this._rules; 
    } 
} 