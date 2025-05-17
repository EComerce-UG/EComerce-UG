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
  itemsPerPage: number = 16;
  itemsPerPageOptions: number[] = [8, 16, 32, 64];
  totalResults: number = 32; // Total de productos (simulado)
  
  // Estado para mostrar/ocultar el menú de filtros
  showFilterMenu: boolean = false;
  
  // Referencia a Math para usar en el template
  Math = Math;
  
  // Datos de productos
  products = [
    {
      id: 1,
      name: 'Minimal Chair',
      price: 250,
      discountPrice: 200,
      image: '#',
      category: 'Chairs',
      isNew: true,
      isSale: true
    },
    {
      id: 2,
      name: 'Modern Sofa',
      price: 450,
      discountPrice: null,
      image: '#',
      category: 'Sofas',
      isNew: false,
      isSale: false
    },
    {
      id: 3,
      name: 'Wooden Table',
      price: 350,
      discountPrice: 300,
      image: '#',
      category: 'Tables',
      isNew: true,
      isSale: true
    },
    {
      id: 4,
      name: 'Pendant Lamp',
      price: 150,
      discountPrice: null,
      image: '#',
      category: 'Lamps',
      isNew: false,
      isSale: false
    },
    {
      id: 5,
      name: 'Kitchen Island',
      price: 550,
      discountPrice: 500,
      image: '#',
      category: 'Kitchen',
      isNew: true,
      isSale: true
    },
    {
      id: 6,
      name: 'Dining Chair',
      price: 180,
      discountPrice: null,
      image: '#',
      category: 'Chairs',
      isNew: false,
      isSale: false
    },
    {
      id: 7,
      name: 'Coffee Table',
      price: 280,
      discountPrice: 250,
      image: '#',
      category: 'Tables',
      isNew: true,
      isSale: true
    },
    {
      id: 8,
      name: 'Floor Lamp',
      price: 200,
      discountPrice: null,
      image: '#',
      category: 'Lamps',
      isNew: false,
      isSale: false
    }
  ];

  // Getters para la interfaz
  get filteredProducts() {
    return this.products.filter(product => 
      this.selectedCategory === 'All' || product.category === this.selectedCategory
    );
  }
  
  get paginatedProducts() {
    // En una aplicación real, esto se haría con paginación del servidor
    return this.filteredProducts.slice(0, this.itemsPerPage);
  }
  
  get showingFrom() {
    return ((this.currentPage - 1) * this.itemsPerPage) + 1;
  }
  
  get showingTo() {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredProducts.length);
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
  }
  
  setItemsPerPage(count: number) {
    this.itemsPerPage = count;
    this.currentPage = 1; // Resetear a la primera página al cambiar items por página
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