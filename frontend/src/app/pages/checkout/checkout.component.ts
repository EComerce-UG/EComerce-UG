import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';

// taiga
import {tuiClamp} from '@taiga-ui/cdk';
import { TuiAlertService, TuiDialogService, TuiLoader, TuiDialogContext, TuiNumberFormat } from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';

import type {PolymorpheusContent} from '@taiga-ui/polymorpheus';
import { CartService, CartItem } from '../../service/cart.service';
import { ProductListToCart } from '../../../interfaces';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

interface BillingDetails {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  townCity: string;
  province: string;
  zipCode: string;
  phone: string;
  emailAddress: string;
  additionalInformation: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, TuiAvatar, TuiNumberFormat],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.less']
})
export class CheckoutComponent implements OnInit {
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  cartItems: CartItem[] = [];
  cartItemsUser: ProductListToCart[] = [];
  subtotal: number = 0;
  subtotalUser: number = 0;
  tempCost: number = 0;
  isLoading = false;
  selectedPaymentMethod = 'bank-transfer';
  
  constructor(private userService:UserService, private authService:AuthService) { }

  billingDetails: BillingDetails = {
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Sri Lanka',
    streetAddress: '',
    townCity: '',
    province: 'Western Province',
    zipCode: '',
    phone: '',
    emailAddress: '',
    additionalInformation: ''
  };

  countries = [
    'Sri Lanka',
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'India',
    'Germany',
    'France',
    'Japan'
  ];

  provinces = [
    'Western Province',
    'Central Province',
    'Southern Province',
    'Northern Province',
    'Eastern Province',
    'North Western Province',
    'North Central Province',
    'Uva Province',
    'Sabaragamuwa Province'
  ];

  ngOnInit(): void {
    this.loadCartData();
    
    // Verificar si el carrito está vacío
    // if (this.cartItemsUser.length === 0) {
    //   this.alerts.open('Your cart is empty. Please add items before checkout.', {
    //     label: 'Empty Cart',
    //     appearance: 'warning'
    //   }).subscribe();
    //   this.router.navigate(['/shop']);
    // }
    this.userService.userCartTotalCost.subscribe((value) => {
      this.subtotalUser = value
    })
  }

  loadCartData(): void {
    this.cartItems = this.cartService.getCartItems(); // Corregido: getItems() -> getCartItems()
    this.cartItemsUser = this.userService.userToCardSelect.value;
    this.subtotal = this.cartService.getCartTotal(); // Corregido: getTotal() -> getCartTotal()
  }

  validateForm(): boolean {
    const requiredFields = [
      { field: this.billingDetails.firstName, name: 'First Name' },
      { field: this.billingDetails.lastName, name: 'Last Name' },
      { field: this.billingDetails.streetAddress, name: 'Street Address' },
      { field: this.billingDetails.townCity, name: 'Town / City' },
      { field: this.billingDetails.phone, name: 'Phone' },
      { field: this.billingDetails.emailAddress, name: 'Email Address' }
    ];

    for (const item of requiredFields) {
      if (!item.field || item.field.trim() === '') {
        this.alerts.open(`${item.name} is required`, {
          label: 'Validation Error',
          appearance: 'error'
        }).subscribe();
        return false;
      }
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.billingDetails.emailAddress)) {
      this.alerts.open('Please enter a valid email address', {
        label: 'Validation Error',
        appearance: 'error'
      }).subscribe();
      return false;
    }

    return true;
  }


  sendCheckoutData(content: PolymorpheusContent): void {
    if(this.userService.userToCardSelect.value.length !== 0) {
      this.tempCost = this.subtotalUser;
      if(this.authService.checkoutFirebaseCartUser().subscribe()) {
        this.userService.userToCardSelect.next([])
        this.userService.updateCartValueSingleton(0);
        this.dialogs.open(content).subscribe();
      }
        return;
    }
    this.alerts.open('Porfavor, agregue productos para poder realizar pagos', {label: `Error en pago`, appearance: 'warning', closeable: false, autoClose: 3000}).subscribe();
    return;
  }

  placeOrder(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    // Simular procesamiento de orden
    setTimeout(() => {
      this.isLoading = false;
      
      // Limpiar carrito
      this.cartService.clearCart();
      
      this.alerts.open('Order placed successfully! You will receive a confirmation email shortly.', {
        label: 'Order Confirmed',
        appearance: 'positive'
      }).subscribe();

      // Redirigir a página de confirmación o home
      this.router.navigate(['/']);
    }, 2000);
  }

  goBackToCart(): void {
    this.router.navigate(['/cart']);
  }
}