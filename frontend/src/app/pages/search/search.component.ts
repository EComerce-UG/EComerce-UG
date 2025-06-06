import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { SearchService } from '../../service/search.service';
import { CartService } from '../../service/cart.service';
import { WishlistService } from '../../service/wishlist.service';
import { ProductList } from '../../../interfaces';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  searchResults: ProductList[] = [];
  isLoading: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private searchService: SearchService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.searchService.searchResults$.subscribe(results => {
        this.searchResults = results;
        this.isLoading = false;
      })
    );

    this.searchTerm = this.searchService.getCurrentSearchTerm();
    this.searchResults = this.searchService.getSearchResults();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.isLoading = true;
      this.searchService.searchProducts(this.searchTerm);
    } else {
      this.clearSearch();
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchService.clearSearch();
  }

  addToCart(product: ProductList): void {
    this.cartService.addToCart(product);
  }

  addToWishlist(product: ProductList): void {
    this.wishlistService.addToWishlist(product);
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  toggleWishlist(product: ProductList): void {
    if (this.isInWishlist(product.id)) {
      this.wishlistService.removeFromWishlist(product.id);
    } else {
      this.wishlistService.addToWishlist(product);
    }
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
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