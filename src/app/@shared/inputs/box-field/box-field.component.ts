import { Component, OnInit, EventEmitter, Input, Output, ViewChild, Renderer} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable} from 'rxjs/Observable';

@Component({
    selector: 'ts-box-field',
    templateUrl: 'box-field.component.html' 
})

export class BoxField implements OnInit{

  constructor( private renderer: Renderer) { }

  /**
    * BINDING
    */
  @Input() icon: string;
  @Input() type: string;
  @Input() placeHolder: string;
  @Input() value: string;
  @Input() inputId: string;
  @Output() keyUpValue: EventEmitter<any> = new EventEmitter<any>();
  @Output() enterValue: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('input') inputs;


  /**
     * FIELDS
    */
  hasIcon:boolean;

  ngOnInit() {
    if(this.icon.length){
        this.hasIcon = true;
    }else{
        this.hasIcon= false;
    }
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
    this.enterValue.emit(value);
  }

  private submit(value){
    this.enterValue.emit(value);
  }

}
