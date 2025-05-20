import { Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
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
  {
    path: 'my-account',
    component: MyAccountComponent
  },
  { path: '', redirectTo: '/shop', pathMatch: 'full' },

];