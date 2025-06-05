import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userIsLogginSource = new BehaviorSubject<boolean>(false);
  private userCountValueSource = new BehaviorSubject<number>(0);
  currenUserLoggin = this.userIsLogginSource;
  userCountValue = this.userCountValueSource;

  constructor() { }

  changeCurrenLoginUser(currentStatusLoginUser:boolean): void {
    this.userIsLogginSource.next(currentStatusLoginUser);
  }

  updateLikeCount(newValueCountLikes:number):void {
    this.userCountValueSource.next(newValueCountLikes);
  }
}
