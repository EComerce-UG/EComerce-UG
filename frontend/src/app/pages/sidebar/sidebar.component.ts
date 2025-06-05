import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  isOpen: boolean = false; // Controla si el sidebar está abierto
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCart();
    this.cartService.getEvent().subscribe((event) => {
      if(event.toggle === 'Side menu') {
        this.toggleDrawer();
      }
    })
  }

  toggleDrawer(): void {
    this.isOpen = !this.isOpen;
    this.updateCart();
  }

  closeDrawer(): void {
    this.isOpen = false;
  }

  updateCart(): void {
    this.cartItems = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.updateCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.updateCart();
  }
}
