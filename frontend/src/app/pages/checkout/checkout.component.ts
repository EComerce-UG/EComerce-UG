import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';

import { TuiAlertService } from '@taiga-ui/core';
import { CartService, CartItem } from '../../service/cart.service';

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
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private readonly alerts = inject(TuiAlertService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  cartItems: CartItem[] = [];
  subtotal: number = 0;
  isLoading = false;
  selectedPaymentMethod = 'bank-transfer';

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
    if (this.cartItems.length === 0) {
      this.alerts.open('Your cart is empty. Please add items before checkout.', {
        label: 'Empty Cart',
        appearance: 'warning'
      }).subscribe();
      this.router.navigate(['/shop']);
    }
  }

  loadCartData(): void {
    this.cartItems = this.cartService.getItems();
    this.subtotal = this.cartService.getTotal();
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