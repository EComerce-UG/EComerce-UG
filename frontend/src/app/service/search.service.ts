import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductList } from '../../interfaces';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResultsSubject = new BehaviorSubject<ProductList[]>([]);
  public searchResults$ = this.searchResultsSubject.asObservable();

  private searchTermSubject = new BehaviorSubject<string>('');
  public searchTerm$ = this.searchTermSubject.asObservable();

  constructor(private productService: ProductService) {}

  searchProducts(term: string): ProductList[] {
    const allProducts = this.productService.getAllProducts();
    
    if (!term.trim()) {
      this.searchResultsSubject.next([]);
      this.searchTermSubject.next('');
      return [];
    }

    const searchTerm = term.toLowerCase().trim();
    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.productContext.toLowerCase().includes(searchTerm)
    );

    this.searchResultsSubject.next(results);
    this.searchTermSubject.next(term);
    return results;
  }

  clearSearch(): void {
    this.searchResultsSubject.next([]);
    this.searchTermSubject.next('');
  }

  getSearchResults(): ProductList[] {
    return this.searchResultsSubject.value;
  }

  getCurrentSearchTerm(): string {
    return this.searchTermSubject.value;
  }
}