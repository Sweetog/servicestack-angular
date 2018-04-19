import { Component, OnInit, EventEmitter, Input, Output, ViewChild, Renderer} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable} from 'rxjs/Observable';

interface SearchByPayload {
    searchString: string;
    option: string;
  }

@Component({
    selector: 'ts-search-by-field',
    templateUrl: 'search-by.component.html' 
})

export class SearchByFieldComponent implements OnInit{

  constructor( private renderer: Renderer) { }

  /**
    * BINDING
    */
  @Input() placeHolder: string;
  @Input() value: string;
  @Input() inputId: string;
  @Input() options: any[];
  @Output() keyUpValue: EventEmitter<any> = new EventEmitter<any>();
  @Output() enterValue: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('input') inputs;


  /**
     * FIELDS
    */
  hasIcon:boolean;
  currentOption: string;
  searchByPayload:SearchByPayload = {
    'searchString':'',
    'option': ''
  }

  ngOnInit() {

    // Init current option to the first option in the list.
    this.currentOption = this.options[0];
  }

  public setValue(newValue){
      this.value = newValue;
  }

  // method to focus input.
  public focusInput(){ 
      this.renderer.invokeElementMethod(this.inputs.nativeElement,'focus');
  }

  // event emmiter for keyup event and input value
  public keyUp(value){
      this.keyUpValue.emit(value);
  }

  public enter(value){
    this.searchByPayload.searchString = value;
    this.searchByPayload.option = this.currentOption;
    this.enterValue.emit(this.searchByPayload);
  }

  private  clickOption(option){
    this.currentOption = option;
  }

}
