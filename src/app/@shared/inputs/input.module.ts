import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormWizardModule } from 'angular2-wizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Inputs
import { Checkbox } from './checkbox/checkbox.component';
import { CheckboxLabeled } from './checkbox-labeled/checkbox-labeled.component';
import { FormField } from './form-field/form-field.component';
import { BoxField } from './box-field/box-field.component';
import { TextareaField } from './textarea-field/textarea-field.component';
import { SelectField } from './select-field/select-field.component';
import { UploadField } from './upload-field/upload-field.component';
import { NumberSelectorComponent } from './number-selector/number-selector.component';
import { FormFieldSearch } from './form-field.search/form-field.search.component';
import { UploadFile } from './upload-file/upload-file.component';
import { SearchByFieldComponent } from './search-by/search-by.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormWizardModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    Checkbox,
    CheckboxLabeled,
    FormField,
    BoxField,
    TextareaField,
    SelectField,
    UploadField,
    NumberSelectorComponent,
    FormFieldSearch,
    UploadFile ,
    SearchByFieldComponent
  ],
  exports: [
    Checkbox,
    CheckboxLabeled,
    FormField,
    BoxField,
    TextareaField,
    SelectField,
    UploadField,
    NumberSelectorComponent,
    FormFieldSearch,
    UploadFile,
    SearchByFieldComponent
  ],
 
  //Place App wide services here.
  providers: []
})
export class InputModule {
  constructor() { }

}