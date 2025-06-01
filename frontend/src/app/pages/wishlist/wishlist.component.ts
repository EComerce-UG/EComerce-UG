import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { WishlistService } from '../../service/wishlist.service';
import { CartService } from '../../service/cart.service';
import { ProductList } from '../../../interfaces';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlistItems: ProductList[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.wishlistService.wishlist$.subscribe(items => {
        this.wishlistItems = items;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  removeFromWishlist(productId: number): void {
    this.wishlistService.removeFromWishlist(productId);
  }

  addToCart(product: ProductList): void {
    this.cartService.addToCart(product);
  }

  addAllToCart(): void {
    this.wishlistItems.forEach(product => {
      this.cartService.addToCart(product);
    });
  }

  clearWishlist(): void {
    this.wishlistService.clearWishlist();
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  continueShopping(): void {
    this.router.navigate(['/shop']);
  }

  // Método para obtener la imagen del producto con fallback
  getProductImage(product: ProductList): string {
    if (product.imagesRoute) {
      return `${product.imagesRoute}1.jpg`;
    }
    return '/placeholder.svg?height=200&width=200';
  }

  // Método para manejar errores de imagen
  onImageError(event: any): void {
    event.target.src = '/placeholder.svg?height=200&width=200';
  }
}