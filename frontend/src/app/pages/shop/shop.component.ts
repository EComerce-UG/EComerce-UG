import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  // Propiedades para categorías y filtros
  bannerImagePath: string = 'assets/images/Shop_Collection.png';
  categories: string[] = ['All', 'Chairs', 'Tables', 'Sofas', 'Lamps', 'Kitchen'];
  selectedCategory: string = 'All';
  sortOptions: string[] = ['Default', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular'];
  selectedSort: string = 'Default';
  
  // Propiedades para la vista y paginación
  viewMode: string = 'grid'; // 'grid' o 'list'
  currentPage: number = 1;
  itemsPerPage: number = 8; // Cambiado a 8 para ver mejor la paginación con pocos datos
  itemsPerPageOptions: number[] = [4, 8, 12, 16];
  
  // Estado para mostrar/ocultar el menú de filtros
  showFilterMenu: boolean = false;
  
  // Referencia a Math para usar en el template
  Math = Math;
  
  // Datos de productos (ampliados a 20 para probar la paginación)
  products = [
    {
      id: 1,
      name: 'Minimal Chair',
      price: 250,
      discountPrice: 200,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Chairs',
      isNew: true,
      isSale: true
    },
    {
      id: 2,
      name: 'Modern Sofa',
      price: 450,
      discountPrice: null,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Sofas',
      isNew: false,
      isSale: false
    },
    {
      id: 3,
      name: 'Wooden Table',
      price: 350,
      discountPrice: 300,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Tables',
      isNew: true,
      isSale: true
    },
    {
      id: 4,
      name: 'Pendant Lamp',
      price: 150,
      discountPrice: null,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Lamps',
      isNew: false,
      isSale: false
    },
    {
      id: 5,
      name: 'Kitchen Island',
      price: 550,
      discountPrice: 500,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Kitchen',
      isNew: true,
      isSale: true
    },
    {
      id: 6,
      name: 'Dining Chair',
      price: 180,
      discountPrice: null,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Chairs',
      isNew: false,
      isSale: false
    },
    {
      id: 7,
      name: 'Coffee Table',
      price: 280,
      discountPrice: 250,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Tables',
      isNew: true,
      isSale: true
    },
    {
      id: 8,
      name: 'Floor Lamp',
      price: 200,
      discountPrice: null,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Lamps',
      isNew: false,
      isSale: false
    },
    // Añadimos más productos para probar la paginación
    {
      id: 9,
      name: 'Accent Chair',
      price: 220,
      discountPrice: null,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Chairs',
      isNew: true,
      isSale: false
    },
    {
      id: 10,
      name: 'Sectional Sofa',
      price: 650,
      discountPrice: 600,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Sofas',
      isNew: false,
      isSale: true
    },
    {
      id: 11,
      name: 'Dining Table',
      price: 400,
      discountPrice: null,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Tables',
      isNew: true,
      isSale: false
    },
    {
      id: 12,
      name: 'Ceiling Lamp',
      price: 180,
      discountPrice: 150,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Lamps',
      isNew: false,
      isSale: true
    },
    {
      id: 13,
      name: 'Kitchen Cabinet',
      price: 750,
      discountPrice: null,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Kitchen',
      isNew: true,
      isSale: false
    },
    {
      id: 14,
      name: 'Bar Stool',
      price: 120,
      discountPrice: 100,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Chairs',
      isNew: false,
      isSale: true
    },
    {
      id: 15,
      name: 'Side Table',
      price: 150,
      discountPrice: null,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Tables',
      isNew: true,
      isSale: false
    },
    {
      id: 16,
      name: 'Table Lamp',
      price: 90,
      discountPrice: 75,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Lamps',
      isNew: false,
      isSale: true
    },
    {
      id: 17,
      name: 'Kitchen Island Stool',
      price: 130,
      discountPrice: null,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Kitchen',
      isNew: true,
      isSale: false
    },
    {
      id: 18,
      name: 'Lounge Chair',
      price: 320,
      discountPrice: 280,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Chairs',
      isNew: false,
      isSale: true
    },
    {
      id: 19,
      name: 'Console Table',
      price: 220,
      discountPrice: null,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Tables',
      isNew: true,
      isSale: false
    },
    {
      id: 20,
      name: 'Wall Lamp',
      price: 110,
      discountPrice: 95,
      image: 'https://placeholder.svg?height=300&width=300',
      category: 'Lamps',
      isNew: false,
      isSale: true
    }
  ];

  // Getters para la interfaz
  get filteredProducts() {
    return this.products.filter(product => 
      this.selectedCategory === 'All' || product.category === this.selectedCategory
    );
  }
  
  get totalResults() {
    return this.filteredProducts.length;
  }
  
  get totalPages() {
    return Math.ceil(this.totalResults / this.itemsPerPage);
  }
  
  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }
  
  get showingFrom() {
    if (this.totalResults === 0) return 0;
    return ((this.currentPage - 1) * this.itemsPerPage) + 1;
  }
  
  get showingTo() {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalResults);
  }
  
  // Método para generar el array de páginas a mostrar
  get pageNumbers(): number[] {
    const totalPages = this.totalPages;
    
    if (totalPages <= 5) {
      // Si hay 5 o menos páginas, mostrar todas
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Si hay más de 5 páginas, mostrar un subconjunto
    if (this.currentPage <= 3) {
      // Si estamos en las primeras páginas
      return [1, 2, 3, 4, 5];
    } else if (this.currentPage >= totalPages - 2) {
      // Si estamos en las últimas páginas
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      // Si estamos en páginas intermedias
      return [this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2];
    }
  }
  
  // Método para verificar si se debe mostrar puntos suspensivos al inicio
  get showStartEllipsis(): boolean {
    return this.totalPages > 5 && this.currentPage > 3;
  }
  
  // Método para verificar si se debe mostrar puntos suspensivos al final
  get showEndEllipsis(): boolean {
    return this.totalPages > 5 && this.currentPage < this.totalPages - 2;
  }

  // Métodos
  toggleFilterMenu() {
    this.showFilterMenu = !this.showFilterMenu;
  }
  
  setCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1; // Resetear a la primera página al cambiar categoría
    this.showFilterMenu = false; // Cerrar el menú después de seleccionar
  }

  setSort(sort: string) {
    this.selectedSort = sort;
    // Aquí iría la lógica de ordenamiento
    this.currentPage = 1; // Resetear a la primera página al cambiar ordenamiento
  }
  
  setItemsPerPage(count: number) {
    this.itemsPerPage = count;
    this.currentPage = 1; // Resetear a la primera página al cambiar items por página
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  addToCart(productId: number) {
    console.log('Added product to cart:', productId);
    // Implementar lógica de carrito aquí
  }

  addToWishlist(productId: number) {
    console.log('Added product to wishlist:', productId);
    // Implementar lógica de lista de deseos aquí
  }
}