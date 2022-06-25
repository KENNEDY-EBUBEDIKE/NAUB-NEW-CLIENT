import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinner = new BehaviorSubject<boolean>(false);

  public readonly spinner$ = this.spinner.asObservable()
  constructor() { }

  show($event:any = null){
    if($event){
      $event.preventDefault()
    }
    this.spinner.next(true);
  }

  hide($event:any = null){
    if($event){
      $event.preventDefault()
    }

    this.spinner.next(false);
  }
}
