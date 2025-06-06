import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../service/cart.service';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  isOpen: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCart();
    this.cartService.events$.subscribe((event: any) => {
      if(event.toggle === 'Side menu') {
        this.toggleDrawer();
      }
    });
  }

  toggleDrawer(): void {
    this.isOpen = !this.isOpen;
    this.updateCart();
  }

  closeDrawer(): void {
    this.isOpen = false;
  }

  updateCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getCartTotal();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.updateCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.updateCart();
  }

  // Métodos adicionales para el nuevo diseño
  viewCart(): void {
    console.log('Ver carrito completo');
    this.closeDrawer();
  }

  checkout(): void {
    console.log('Proceder al checkout');
    this.closeDrawer();
  }
}