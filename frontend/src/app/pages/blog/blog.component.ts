import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  image: string;
  tags?: string[];
}

interface Category {
  name: string;
  count: number;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  selectedCategory: string = 'all';
  selectedPost: BlogPost | null = null;
  categories: Category[] = [];

  // Array de posts del blog
  allPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Going all-in with millennial design',
      content: `Income teams select at grade construction engineering site and on demand transport feedback at finance or equipment, which include a number of new offices and stores, very important to the UK's global presence. Building a single equipment unit can be used to provide a wide range of projects in response to the need for the flexibility of the Group's operations.
      
      The Group has also been able to use other equipment providing the sole potential infrastructure and development programs even throughout a financial or sufficient region among overseas technical alternatives.`,
      excerpt: 'Income teams select at grade construction engineering site and on demand transport feedback...',
      author: 'Admin',
      category: 'Wood',
      date: '14 Oct 2022',
      image: 'assets/images/home9.png',
      tags: ['Air (2010)', 'LOC (2022)', 'Harmonious']
    },
    {
      id: 2,
      title: 'Exploring new ways of decorating',
      content: `Income teams select at home construction engineering site and on demand transport feedback at finance or equipment, which include a number of new offices and stores, very important to the need for the flexibility of the Group's operations.
      
      Building a single equipment unit can be used to provide a wide range of projects in response to the need for the flexibility of the Group's operations. The Group has also been able to use other equipment providing the sole potential infrastructure and development programs even throughout a financial or sufficient region among overseas technical alternatives.`,
      excerpt: 'Income teams select at home construction engineering site and on demand transport feedback...',
      author: 'Admin',
      category: 'Handmade',
      date: '14 Oct 2022',
      image: 'assets/images/home10.png',
      tags: ['Air (2010)', 'LOC (2022)', 'Royal']
    },
    {
      id: 3,
      title: 'Handmade pieces that took time to make',
      content: 'Detailed content about handmade crafts and the time investment required to create beautiful, lasting pieces.',
      excerpt: 'Detailed content about handmade crafts and the time investment required...',
      author: 'Admin',
      category: 'Crafts',
      date: '03 Aug 2022',
      image: 'assets/images/home9.png'
    },
    {
      id: 4,
      title: 'Modern home in Milan',
      content: 'Exploring contemporary design trends in Milan\'s residential architecture and interior design.',
      excerpt: 'Exploring contemporary design trends in Milan\'s residential architecture...',
      author: 'Admin',
      category: 'Design',
      date: '03 Aug 2022',
      image: 'assets/images/home10.png'
    },
    {
      id: 5,
      title: 'Colorful office redesign',
      content: 'How to transform your workspace with vibrant colors and modern design principles.',
      excerpt: 'How to transform your workspace with vibrant colors and modern design...',
      author: 'Admin',
      category: 'Interior',
      date: '03 Aug 2022',
      image: 'assets/images/home9.png'
    },
    {
      id: 6,
      title: 'Sustainable wood furniture',
      content: 'The importance of sustainable sourcing for wood furniture and how to identify eco-friendly options.',
      excerpt: 'The importance of sustainable sourcing for wood furniture and how to identify eco-friendly options...',
      author: 'Admin',
      category: 'Wood',
      date: '01 Aug 2022',
      image: 'assets/images/home10.png'
    },
    {
      id: 7,
      title: 'DIY craft projects for beginners',
      content: 'Simple craft projects anyone can do at home with minimal supplies and experience.',
      excerpt: 'Simple craft projects anyone can do at home with minimal supplies and experience...',
      author: 'Admin',
      category: 'Crafts',
      date: '28 Jul 2022',
      image: 'assets/images/home9.png'
    }
  ];

  ngOnInit() {
    // Calcular categorías y conteos dinámicamente
    this.calculateCategories();
  }

  // Método para calcular categorías y sus conteos
  calculateCategories() {
    // Obtener categorías únicas
    const uniqueCategories = [...new Set(this.allPosts.map(post => post.category))];
    
    // Crear array de categorías con conteos
    this.categories = uniqueCategories.map(categoryName => {
      const count = this.allPosts.filter(post => post.category === categoryName).length;
      return { name: categoryName, count };
    });
    
    // Ordenar alfabéticamente
    this.categories.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Posts recientes (últimos 5)
  get recentPosts(): BlogPost[] {
    return this.allPosts.slice(0, 5);
  }

  // Posts filtrados por categoría
  get filteredPosts(): BlogPost[] {
    if (this.selectedCategory === 'all') {
      return this.allPosts;
    }
    return this.allPosts.filter(post => post.category === this.selectedCategory);
  }

  // Método para filtrar por categoría
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.selectedPost = null; // Reset selected post when filtering
  }

  // Método para mostrar todos los posts
  showAllPosts(): void {
    this.selectedCategory = 'all';
    this.selectedPost = null;
  }

  // Método para mostrar un post específico
  showPost(post: BlogPost): void {
    this.selectedPost = post;
  }

  // Método para volver a la lista de posts
  backToList(): void {
    this.selectedPost = null;
  }
}