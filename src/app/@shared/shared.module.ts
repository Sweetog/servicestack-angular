// Vendor
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormWizardModule } from 'angular2-wizard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ChartsModule } from 'ng2-charts';
import { TextMaskModule } from 'angular2-text-mask';
/**
 * Modules
 */
import { InputModule } from './inputs/input.module'

import { TreeModule } from 'ng2-tree';

/**
 * SharedModule rarely has providers and probably shouldn't
 * SharedModule does have declarations,exports
 * SharedModule is imported in the modules where it is needed
 * SharedModule is NOT imported at the AppModule level
 * SharedModule is imported by Features
 */
@NgModule({
  providers:[
  ],
  imports: [
    InputModule,
    CommonModule,
    RouterModule,
    FormWizardModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    TextMaskModule,
    TreeModule,
  ],
  exports: [
    /**
     * export "vendor" modules that will be used throughout the app
     * so any module that imports the SharedModule will access to commonnly
     * used AngularJs modules and other third party modules
     * 
     */
    InputModule,
    ChartsModule,
    TextMaskModule,
    CommonModule,
    NgbModule,
    FormWizardModule,
    ReactiveFormsModule,
    Ng2DragDropModule,
    ToastModule,
    TreeModule
  ],
  declarations: [

  ],
  entryComponents: [

  ]
})
export class SharedModule {
  constructor() { }
}