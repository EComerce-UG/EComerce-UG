import { Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthguardService } from './auth/authguard.service';

export const routes: Routes = [
  { 
    path: 'product-view/:id', 
    component: ProductComponent,
  },
  { 
    path: 'cart', 
    component: CartComponent, 
    canActivate: [AuthguardService]
  },
  { 
    path: 'shop', 
    component: ShopComponent, 
  },
  { path: '', redirectTo: '/shop', pathMatch: 'full' }
];