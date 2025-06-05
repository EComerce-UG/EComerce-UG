import { Injectable } from '@angular/core';
import { ProductList } from '../../interfaces';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface CartItem {
  product: ProductList;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private requestOpenComponentSource = new Subject();

  constructor() {}

  sendEvent(data:object) {
    this.requestOpenComponentSource.next(data);
  }

  getEvent():Observable<any> {
    return this.requestOpenComponentSource.asObservable()
  }

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(product: ProductList): void {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  removeFromCart(productId: number): void {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  clearCart(): void {
    this.items = [];
  }

  getTotal(): number {
    return this.items.reduce((total, item) => {
      const price = item.product.discountPrice ?? item.product.price;
      return total + price * item.quantity;
    }, 0);
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }
}
