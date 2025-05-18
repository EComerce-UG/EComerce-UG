import { Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
  { 
    path: 'product-view/:id', 
    component: ProductComponent,
  },
  { 
    path: 'shop', 
    component: ShopComponent, 
  },
  { path: '', redirectTo: '/shop', pathMatch: 'full' }
];