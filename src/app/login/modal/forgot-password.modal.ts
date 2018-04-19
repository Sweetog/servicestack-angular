import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
//validators 
import { EmailValidator } from '../validators/email.validator';

export interface ForgotPasswordModel {
}

@Component({
  selector: 'ts-forgot-password-modal',
  templateUrl: './forgot-password.modal.html'
})
export class ForgotPasswordModal extends DialogComponent<ForgotPasswordModel, null> implements ForgotPasswordModel, OnInit {

  constructor(
    dialogService: DialogService,
    private fb: FormBuilder) {
      super(dialogService);
  }

  /**
   * BINDINGS
   */


  /**
   * FIELDS
   */
  passwordRecoveryForm: FormGroup;
  emailValidator = new EmailValidator();


  ngOnInit() { 
      this.passwordRecoveryForm = this.fb.group({
        email: ["", this.emailValidator.rules]
      });

      this.emailValidator.valueChangesSubscribe(this.passwordRecoveryForm);
  }
 
  onCancel():void{
    this.close()
  }

  submit():void{
    this.result = this.passwordRecoveryForm.value.email;
    this.close();
  }

}