import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SpinnerService {

    //never default behavior of the progress spinner to on/true, the spinner itself should
    //never assume it knows the state of any request or data retrieval and that is best expressed with the spinner being off/false -BJO 7-20-2017
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


    display(value: boolean) {
        this.status.next(value);
    }

}