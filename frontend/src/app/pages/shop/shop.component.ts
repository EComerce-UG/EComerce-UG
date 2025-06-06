import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductList, User } from '../../../interfaces';
import { ProductService } from '../../service/product.service';
import { WishlistService } from '../../service/wishlist.service'; // Agregar WishlistService
import { CartService } from '../../service/cart.service'; // Agregar CartService
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs'; // Agregar Subscription

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  // Datos
  allProductsList: ProductList[] = [];
  like = true
  // Propiedades para categorías y filtros
  bannerImagePath: string = 'assets/images/Shop_Collection.png';
  categories: string[] = ['All', 'Chairs', 'Tables', 'Sofas', 'Lamps', 'Kitchen'];
  selectedCategory: string = 'All';
  sortOptions: string[] = ['Default', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular'];
  selectedSort: string = 'Default';
  userLikes: ProductList[] = [];
  
  // Propiedades para la vista y paginación
  viewMode: string = 'grid'; // 'grid' o 'list'
  currentPage: number = 1;
  itemsPerPage: number = 16;
  itemsPerPageOptions: number[] = [4, 8, 16, 32, 64];
  
  // Estado para mostrar/ocultar el menú de filtros
  showFilterMenu: boolean = false;
  
  // Referencia a Math para usar en el template
  Math = Math;

  // Agregar subscriptions para manejar observables
  private subscriptions: Subscription = new Subscription();

  constructor(
    private productService: ProductService, 
    private authService: AuthService, 
    private http: HttpClient,
    private wishlistService: WishlistService, // Inyectar WishlistService
    private cartService: CartService // Inyectar CartService
  ) {
    this.allProductsList = this.productService.getAllProducts();
    this.checkForLikes();
    this.initializeWishlistSync();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // Sincronizar con el WishlistService
  initializeWishlistSync(): void {
    this.subscriptions.add(
      this.wishlistService.wishlist$.subscribe(wishlistItems => {
        // Actualizar userLikes basado en el WishlistService
        this.userLikes = wishlistItems;
      })
    );
  }
  
  // Getters para la interfaz
  checkForLikes(): void {
    this.authService.getUserFromToken().subscribe((response) => {
      this.authService.getUserLikesInfo(response.user.user.likes).subscribe((response) => {
        this.userLikes = response.products;
        // Sincronizar con WishlistService
        response.products.forEach((product: ProductList) => {
          if (!this.wishlistService.isInWishlist(product.id)) {
            this.wishlistService.addToWishlist(product);
          }
        });
      }, (error: any) => {
        console.log(error);
      })
    })
  }

  // Método mejorado que usa WishlistService
  isInUserLike(productId: number): boolean {
    return this.wishlistService.isInWishlist(productId);
  }
  
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

  // Método mejorado para agregar al carrito
  addToCart(productId: number) {
    const product = this.allProductsList.find(p => p.id === productId);
    if (product) {
      this.cartService.addToCart(product);
      console.log('Added product to cart:', productId);
    }
  }

  // Método mejorado para wishlist que usa WishlistService
  addToWishlist(productId: number): void {
    const product = this.allProductsList.find(p => p.id === productId);
    if (!product) return;

    // Usar WishlistService para toggle
    if (this.wishlistService.isInWishlist(productId)) {
      this.wishlistService.removeFromWishlist(productId);
      // También actualizar en el backend si es necesario
      this.removeFromBackendWishlist(productId);
    } else {
      this.wishlistService.addToWishlist(product);
      // También actualizar en el backend si es necesario
      this.addToBackendWishlist(productId);
    }
  }

  // Métodos auxiliares para sincronizar con el backend
  private addToBackendWishlist(productId: number): void {
    this.authService.getUserFromToken().subscribe((response) => {
      let userId = response.user.user.id;
      this.authService.addLikeProductUser(productId, userId).subscribe((response) => {
        console.log('Added to backend wishlist:', response);
      }, (error: any) => {
        console.log('Error adding to backend wishlist:', error);
        // Si falla, remover del WishlistService
        this.wishlistService.removeFromWishlist(productId);
      });
    }, (error: any) => {
      console.log('Error getting user token:', error);
      // Si falla, remover del WishlistService
      this.wishlistService.removeFromWishlist(productId);
    });
  }

  private removeFromBackendWishlist(productId: number): void {
    this.authService.getUserFromToken().subscribe((response) => {
      let userId = response.user.user.id;
      this.authService.updateUserLikes(productId, userId).subscribe((response) => {
        console.log('Removed from backend wishlist:', response);
      }, (error: any) => {
        console.log('Error removing from backend wishlist:', error);
        // Si falla, volver a agregar al WishlistService
        const product = this.allProductsList.find(p => p.id === productId);
        if (product) {
          this.wishlistService.addToWishlist(product);
        }
      });
    }, (error: any) => {
      console.log('Error getting user token:', error);
      // Si falla, volver a agregar al WishlistService
      const product = this.allProductsList.find(p => p.id === productId);
      if (product) {
        this.wishlistService.addToWishlist(product);
      }
    });
  }
}