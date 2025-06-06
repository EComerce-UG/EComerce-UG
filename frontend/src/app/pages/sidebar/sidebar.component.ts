import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../service/cart.service';
import { DecimalPipe, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DecimalPipe, NgIf, NgFor],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  isOpen: boolean = false;

  constructor(
    private cartService: CartService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateCart();
    
    // Usar events$ observable - NO getEvent()
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
    // Usar getCartItems() - NO getItems()
    this.cartItems = this.cartService.getCartItems();
    // Usar getCartTotal() - NO getTotal()
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

  // Método actualizado para navegar al carrito
  viewCart(): void {
    console.log('Navegando al carrito completo');
    this.closeDrawer(); // Cerrar el sidebar primero
    this.router.navigate(['/cart']); // Navegar a la página del carrito
  }

  // Método actualizado para navegar al checkout
  checkout(): void {
    // Verificar si hay productos en el carrito
    if (this.cartItems.length === 0) {
      console.log('El carrito está vacío');
      // Opcional: mostrar un mensaje de error
      return;
    }
    
    console.log('Proceder al checkout');
    this.closeDrawer(); // Cerrar el sidebar primero
    this.router.navigate(['/checkout']); // Navegar a la página de checkout
  }
}