import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TuiAlertService } from '@taiga-ui/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

import { AuthService } from '../../service/auth.service';
import { WishlistService } from '../../service/wishlist.service';
import { CartService } from '../../service/cart.service'; // Agregar esta importación
import { ProductList } from '../../../interfaces';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  providers: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuOpen: boolean = false;
  likesProductsTotal: number = 0;
  private readonly alerts = inject(TuiAlertService);
  private subscriptions: Subscription = new Subscription();

  constructor(
    public userService: AuthService,
    private userRoutes: Router,
    private wishlistService: WishlistService,
    private cartService: CartService // Agregar esta inyección
  ) { }

  ngOnInit(): void {
    // Suscribirse a los cambios en la wishlist
    this.subscriptions.add(
      this.wishlistService.wishlist$.subscribe(wishlistItems => {
        this.likesProductsTotal = wishlistItems.length;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleMenu(): void {
    if(this.userService.isLoggedIn()) {
      this.menuOpen = !this.menuOpen;
      this.cartService.sendEvent({toggle: 'Side menu', open: this.menuOpen} as {});
    }
  }

  checkUserLoggin(userWantsToGo: string): void {
    // Si es el carrito, abrir el sidebar en lugar de navegar
    if (userWantsToGo === 'cart') {
      if (!this.userService.isLoggedIn()) {
        this.alerts.open('Please login to start buying.', {
          label: 'Currently not logged in', 
          appearance: 'warning'
        }).subscribe();
        return;
      }
      // Abrir el sidebar del carrito
      this.cartService.sendEvent({ toggle: 'Side menu' });
      return;
    }

    if (!this.userService.isLoggedIn()) {
      if (userWantsToGo === "my-account") {
        this.userRoutes.navigate([userWantsToGo]);
        return;
      }
      this.alerts.open('Please login to start buying.', {
        label: 'Currently not logged in', 
        appearance: 'warning'
      }).subscribe();
      return;
    } else {
      this.userRoutes.navigate([userWantsToGo]);
      return;
    }
  }
}