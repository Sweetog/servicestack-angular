import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { ValidationMessageService } from './validation.message.service'
import { AppModule } from '../../app.module';

export abstract class Validator {

    private _messages: any[];
    private _hasError: boolean = false;
    private _debounceTime: number = 500; //debounceTime for all inputs in app
    protected validationMessageService: ValidationMessageService;

    /**
     * ValidationMessageService is not injected in the constructor because it is an abstract class and 
     * would require all concrete instances of Validator to have to worry about injecting ValidationMessageService
     * using the AppModule.injector makes it easier for implementations to be a Validator
     */
    constructor() {
        this.validationMessageService = AppModule.injector.get(ValidationMessageService);
    }

    abstract get controlName(): string;
    abstract get rules(): Array<Validators>;
    abstract get messageTemplates(): Object;

    public get messages(): any[] {
        return this._messages;
    }

    public set messages(value: any[]) {
        this._messages = value;
    }

    public get hasError(): boolean {
        return this._hasError;
    }

    public set hasError(value: boolean) {
        this._hasError = value;
    }

    public get required(): boolean{
        return this.checkIfRequired();
    }

    private checkIfRequired():boolean{
        for (var i = 0; i < this.rules.length; i++) {
           let current = this.rules[i];
            if ( current === Validators.required ){
                return true;
            }
        }
    }

    /**
     * A method that will find its control in the FormGroup and subscribte to valueChange events
     * and update the control with hasError and messages
     * @method valueChangesSubscribe
     * @param form 
     */
    public valueChangesSubscribe(form: FormGroup) {
        var control = form.get(this.controlName);

        control.valueChanges
            .debounceTime(this._debounceTime)
            .subscribe(value => {
                this.valueChanges(form);
            });
    }

    /**
     * Convenience method to get value of FormControl this Validator validates
     * Value is not guaranteed to be valid unless calling after Form submit click
     * @method getValue
     * @param form 
     */
    public getValue(form: FormGroup): any {
        return form.get(this.controlName).value;
    }

    /**
     * ----------------------------------------
     * Private helper functions
     * ----------------------------------------
     */

    /**
     * @method valueChanges
     * @param control 
     * @param messages 
     * @param errorId
     * @return {any[]} 
    */
    private valueChanges(form: FormGroup) {
        //assume valid, clear errors
        this.hasError = false;
        this.messages = null;

        var control = form.get(this.controlName);

        if ((control.touched || control.dirty) && control.errors) {
            this.hasError = true;
            // Maps error type to string and returns array of appropriate error messages. 
            this.messages = Object.keys(control.errors).map(key => this.messageTemplates[key]);
        }

    }
}