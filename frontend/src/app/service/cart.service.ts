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

  constructor() {
    // Agregar datos de prueba al inicializar el servicio
    this.initTestData();
  }

  // Método para inicializar datos de prueba
  private initTestData(): void {
    const testProducts: ProductList[] = [
      {
        id: 1,
        name: 'Asgaard sofa',
        price: 250000.00,
        quantityAvailable: 5,
        discountPrice: 225000.00,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
        category: 'Sofas',
        isNew: true,
        isSale: true,
        colorAvailable: ["bg-neutral-500", "bg-neutral-200"],
        rating: 5,
        quantityReviews: 120,
        productContext: 'Comfortable and elegant sofa perfect for modern living rooms',
        productDescription: 'A luxurious sofa with premium materials and contemporary design.',
        imagesRoute: 'assets/sofa/'
      },
      {
        id: 2,
        name: 'Modern Coffee Table',
        price: 75000.00,
        quantityAvailable: 3,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=400&fit=crop',
        category: 'Tables',
        isNew: false,
        isSale: false,
        colorAvailable: ["bg-amber-950", "bg-stone-800"],
        rating: 4.5,
        quantityReviews: 89,
        productContext: 'Elegant coffee table for your living room',
        productDescription: 'A stylish coffee table that complements any modern decor.',
        imagesRoute: 'assets/table/'
      }
    ];

    // Agregar productos al carrito para prueba
    testProducts.forEach(product => {
      this.addToCart(product);
    });
  }

  sendEvent(data: object) {
    this.requestOpenComponentSource.next(data);
  }

  getEvent(): Observable<any> {
    return this.requestOpenComponentSource.asObservable();
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

  // Método adicional para limpiar datos de prueba
  clearTestData(): void {
    this.items = [];
  }

  // Método para agregar datos de prueba manualmente
  addTestData(): void {
    this.initTestData();
  }
}