import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'ts-checkbox-labeled',
    templateUrl: 'checkbox-labeled.component.html'
})

export class CheckboxLabeled implements OnInit {

    constructor() { }

    /**
     * BINDINGS
     */
    @Input() label: string;
    @Input() cssId: string;
    @Input() checked: boolean;
    @Input() disabled: boolean = false;
    @Output() onChecked: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * FIELDS
     */
    @ViewChild('input') input;

    ngOnInit() { }

    handleCheck(checked: boolean) {
        //what we are sending to the event handler that is being passed to parent function.
        this.checked = checked;
        this.onChecked.emit(checked);
    }

    public uncheckBox() {
        this.checked = false;
        this.input.nativeElement.checked = false;
    }

    public checkBox() {
        this.checked = true;
        this.input.nativeElement.checked = true;
    }


}
