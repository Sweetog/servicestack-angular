import { Component, OnDestroy, OnInit, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
//Services 
import { AuthService } from '../@core/auth/api/auth.service';
import { SpinnerService } from '../@core/spinner/spinner.service';
import { DialogService } from "ng2-bootstrap-modal";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppRoutes } from '../@core/const/routes/app-routes.const'
// Modals
import { ForgotPasswordModal } from './modal/forgot-password.modal';
//Animations
import { PageTransition } from '../animation';
import { Animate } from '../@core/const/animation.const';
//Validators
import { UsernameValidator } from './validators/username.validator'
import { PasswordValidator } from './validators/password.validator'
import { CurrentUserService } from '../@core/auth/current-user.service';

@Component({
  templateUrl: './login.component.html',
  animations: [PageTransition]
})
export class LoginComponent implements OnInit {
  private redirectTo: string = '';

  constructor(
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private spinnerService: SpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    public http: Http,
    private fb: FormBuilder,
    private authService: AuthService,
    private currentUserService: CurrentUserService,
    private dialogService: DialogService) { 
      this.toastr.setRootViewContainerRef(vcr);      
    }

  /**
   * BINDINGS
   */
  @ViewChild('UserNameInput') userNameInput;
  @ViewChild('SubmitMessageModal') submitMessageModal;

  /**
  * Fields
  */
  private state: string = Animate.in;
  private background = require('../assets/images/construction-background.jpg');
  private form: FormGroup;
  private usernameValidator = new UsernameValidator();
  private passwordValidator = new PasswordValidator();
  private NgbModalOptions = { closeByClickingOutside: true, size: "lg" };
  private isDevelopment = AppConfig.isDevelopment;
  private loginError :string;


  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.redirectTo = params['redirectTo'] || '');
    //view animations.
    this.state = (this.state === Animate.in ? Animate.out : Animate.in);

    this.form = this.fb.group({
      username: ["", this.usernameValidator.rules],
      password: ["", this.passwordValidator.rules]
    });

    //subscribe validators to valueChanges in the form they live in
    this.usernameValidator.valueChangesSubscribe(this.form);
    this.passwordValidator.valueChangesSubscribe(this.form);

    this.userNameInput.nativeElement.focus()

    if(this.currentUserService.isLoggedIn){
      this.router.navigate(['/', AppRoutes.Dashboard]);
    }

  }//end ngOnInit


  // LOGIN
  loginAttemptComplete(resp: boolean): void {
    if (resp) {
      this.spinnerService.display(false);
      this.router.navigateByUrl(this.redirectTo);
    } else {
      this.spinnerService.display(false);
      this.loginError = "User name and/or passward are incorrect.";
    }
  }

  submit() {
    this.spinnerService.display(true);
    this.authService.authenticate(this.usernameValidator.getValue(this.form), this.passwordValidator.getValue(this.form))
      .then(res => {
        this.loginAttemptComplete(true);
      }, msg => {
        this.loginAttemptComplete(false);
      })
  }


  forgotPasswordClick(){
    this.dialogService.addDialog(ForgotPasswordModal,[], this.NgbModalOptions)
      .subscribe( result => {
          // Send off the email to where ever here. 
          // 
          if(result){
            this.spinnerService.display(true);

          }
          else
            return;
          
      })
  }
  

  contactClick(){

  }

  closeSidePanel(){
    this.submitMessageModal.closePanel();
  }

  sendForm(e){
    console.log(e);
    this.closeSidePanel();
  }

  cancelForm(){
    this.closeSidePanel();
  }
}

