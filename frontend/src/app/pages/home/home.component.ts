import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class HomeComponent {
  // Productos destacados
  featuredProducts = [
    {
      img: 'assets/images/home2.png',
      name: 'Side Table'
    },
    {
      img: 'assets/images/home3.png',
      name: 'Side Table'
    }
  ];

  // Top Picks
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

  // Blogs
  blogs = [
    {
      id: 1,
      img: 'assets/images/home9.png',
      title: 'Going all-in with millennial design',
      readTime: '5 min',
      date: 'Oct 2022'
    },
    {
      id: 2,
      img: 'assets/images/home10.png',
      title: 'Exploring new trends in 2023',
      readTime: '4 min',
      date: 'Nov 2022'
    },
    {
      id: 3,
      img: 'assets/images/home11.png',
      title: 'Sustainable materials for modern homes',
      readTime: '6 min',
      date: 'Dec 2022'
    }
  ];
}