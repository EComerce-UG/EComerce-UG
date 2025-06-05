import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TuiAlertService } from '@taiga-ui/core';
import { Router } from "@angular/router";

import { AuthService } from '../../service/auth.service';
import { ProductList } from '../../../interfaces';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  providers: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  menuOpen:boolean = false;
  @Input() likesProductsTotal:number = 0; 
  private readonly alerts = inject(TuiAlertService);
  userLikes: ProductList[] = [];

  constructor(public userService: AuthService, private userRoutes: Router, private cartService: CartService) { }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.cartService.sendEvent({toggle: 'Side menu', open: this.menuOpen} as {});
  }

  checkUserLoggin(userWantsToGo:string): void {
    if(!this.userService.isLoggedIn()) {
      if(userWantsToGo === "my-account") {
        this.userRoutes.navigate([userWantsToGo]);
        return;
      }
      this.alerts.open('Please login to start buying.', {label: 'Curretly not loggin', appearance: 'warning'}).subscribe();
      return;
    } else {
      this.userRoutes.navigate([userWantsToGo]);
      return;
    }
  }
}