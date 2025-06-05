import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductListToCart } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userIsLogginSource = new BehaviorSubject<boolean>(false);
  private userCountValueSource = new BehaviorSubject<number>(0);
  userToCardSelect = new BehaviorSubject<[] | ProductListToCart[]>([]);
  currenUserLoggin = this.userIsLogginSource;
  userCountValue = this.userCountValueSource;

  constructor() { }

  changeCurrenLoginUser(currentStatusLoginUser:boolean): void {
    this.userIsLogginSource.next(currentStatusLoginUser);
  }

  updateLikeCount(newValueCountLikes:number):void {
    this.userCountValueSource.next(newValueCountLikes);
  }

  updateUserCardSelect(arrayData:ProductListToCart): void {
    this.userToCardSelect.next([...this.userToCardSelect.value, arrayData])
    console.log(this.userToCardSelect.value)
  }
}
