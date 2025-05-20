import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // o .scss si usas SCSS
})
export class HomeComponent {
  // Aquí  definir propiedades 

  // 
  products = [
    {
      img: 'assets/images/home4.png',
      name: 'Twain modular sofa',
      price: 'Rs. 25,000.00'
    },
    {
      img: 'assets/images/home5.png',
      name: 'Garcia dining table set',
      price: 'Rs. 25,000.00'
    },
    {
      img: 'assets/images/home6.png',
      name: 'Outdoor bar table',
      price: 'Rs. 25,000.00'
    },
    {
      img: 'assets/images/home7.png',
      name: 'Plain console teak',
      price: 'Rs. 25,000.00'
    }
  ];

  // Newsletter logic 
  subscribe(email: string): void {
    if (email) {
      console.log(`Subscribed with: ${email}`);
    }
  }
}

