import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductList } from '../../../interfaces';
import { ProductService } from '../../service/product.service';
import fs from 'fs';

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
  itemsPerPageOptions: number[] = [8, 16, 32, 64];
  totalResults: number = 32; // Total de productos (simulado)
  
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