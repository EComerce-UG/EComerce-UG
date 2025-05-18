import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductList } from '../../../interfaces';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  // Datos
  allProductsList: ProductList[] = [];
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

  constructor(private productService: ProductService) {
    this.allProductsList = this.productService.getAllProducts();
  }
  
  // Getters para la interfaz
  get filteredProducts() {
    return this.allProductsList.filter(product => 
      this.selectedCategory === "All" || product.category === this.selectedCategory
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