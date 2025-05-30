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
  itemsPerPage: number = 16;
  itemsPerPageOptions: number[] = [4, 8, 16, 32, 64];
  
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
  
  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  get totalResults() {
    return this.filteredProducts.length;
  }
  
  get totalPages() {
    return Math.ceil(this.totalResults / this.itemsPerPage);
  }
  
  get showingFrom() {
    if (this.totalResults === 0) return 0;
    return ((this.currentPage - 1) * this.itemsPerPage) + 1;
  }
  
  get showingTo() {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalResults);
  }
  
  get pages() {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    
    // Si hay 7 o menos páginas, mostrar todas
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Si estamos cerca del inicio
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    
    // Si estamos cerca del final
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    // Si estamos en el medio
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
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
    // Implementar lógica de ordenamiento según el valor de sort
    this.currentPage = 1; // Resetear a la primera página al cambiar ordenamiento
  }
  
  setItemsPerPage(count: number) {
    this.itemsPerPage = count;
    this.currentPage = 1; // Resetear a la primera página al cambiar items por página
  }
  
  goToPage(page: number | string) {
    if (typeof page === 'number') {
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