import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Rx } from 'rxjs/Rx';

@Injectable()
export class SharedService {

  private messageSource = new BehaviorSubject("");
  receiveData = this.messageSource.asObservable();

  constructor() { }

  sendData(message) {
    this.messageSource.next(message)
  }

}
