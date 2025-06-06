import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductListToCart } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userIsLogginSource = new BehaviorSubject<boolean>(false);
  private userCurrentIdSource = new BehaviorSubject<string>("");
  private userCountValueSource = new BehaviorSubject<number>(0);
  private userCartTotalCostSource = new BehaviorSubject<number>(0);
  private userToCardSelectSource = new BehaviorSubject<[] | ProductListToCart[]>([]);
  currenUserLoggin = this.userIsLogginSource;
  userCountValue = this.userCountValueSource;
  userCartTotalCost = this.userCartTotalCostSource.asObservable();
  userCurrentId = this.userCurrentIdSource;
  userToCardSelect = this.userToCardSelectSource;

  constructor() { }

  setUserStructure(isLoggin:boolean, currentId:string, cartSelect:ProductListToCart[]|[], likeCount:number): void {
    let tempSum:number = 0;
    this.userIsLogginSource.next(isLoggin);
    this.userCurrentIdSource.next(currentId);
    this.userToCardSelectSource.next(cartSelect);
    this.userCountValueSource.next(likeCount);
    cartSelect.forEach((value) => {
      tempSum += (value.price * value.quantity);
    })
    this.userCartTotalCostSource.next(tempSum);
  }

  changeCurrenLoginUser(currentStatusLoginUser:boolean): void {
    this.userIsLogginSource.next(currentStatusLoginUser);
  }

  updateLikeCount(newValueCountLikes:number):void {
    this.userCountValueSource.next(newValueCountLikes);
  }

  initialStateCardSelect(arrayData:ProductListToCart[]): void {
    this.userToCardSelectSource.next(arrayData);
  }

  updateUserCardSelect(arrayData:ProductListToCart): void {
    this.userToCardSelectSource.next([...this.userToCardSelectSource.value, arrayData]);
  }

  updateCartValue(arrayData:ProductListToCart): void {
    this.userCartTotalCostSource.next(this.userCartTotalCostSource.value + (arrayData.price * arrayData.quantity));
  }

  updateCartValueSingleton(value:number):void {
    this.userCartTotalCostSource.next(value);
  }

  deleteUserCart(productId:number):boolean {
    // cuando se haya eliminado el producto, mandar correcto
    let result: boolean = true;
    let newCarValue:number = 0;
    const tempData = this.userToCardSelectSource.value.filter((value,idx) => value.id !== productId)
    tempData.forEach((value) => {
      newCarValue += (value.price * value.quantity)
    })
    this.userCartTotalCostSource.next(newCarValue);
    this.userToCardSelectSource.next(tempData)
    
    return result
  }
}
