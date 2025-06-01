import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductList } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems: ProductList[] = [];
  private wishlistSubject = new BehaviorSubject<ProductList[]>([]);
  public wishlist$ = this.wishlistSubject.asObservable();

  constructor() {
    this.loadWishlistFromStorage();
  }

  private loadWishlistFromStorage(): void {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      this.wishlistItems = JSON.parse(stored);
      this.wishlistSubject.next(this.wishlistItems);
    }
  }

  private saveWishlistToStorage(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
    this.wishlistSubject.next(this.wishlistItems);
  }

  addToWishlist(product: ProductList): void {
    const exists = this.wishlistItems.find(item => item.id === product.id);
    if (!exists) {
      this.wishlistItems.push(product);
      this.saveWishlistToStorage();
    }
  }

  removeFromWishlist(productId: number): void {
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== productId);
    this.saveWishlistToStorage();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.some(item => item.id === productId);
  }

  getWishlistItems(): ProductList[] {
    return this.wishlistItems;
  }

  getWishlistCount(): number {
    return this.wishlistItems.length;
  }

  clearWishlist(): void {
    this.wishlistItems = [];
    this.saveWishlistToStorage();
  }
}