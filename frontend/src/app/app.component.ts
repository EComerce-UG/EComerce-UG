import { TuiRoot } from '@taiga-ui/core';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
// Componentes personalizados
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthService } from './service/auth.service';
import { ProductList, User } from '../interfaces';
import { SidebarComponent } from './pages/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    TuiRoot,
    CommonModule, 
    SidebarComponent,
    HeaderComponent, 
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EComerce-UG';
  likesTotal:number = 0;
  private readonly authService = inject(AuthService)
  userLikes: ProductList[] = [];

  constructor(private userRoutes: Router) { 
    this.checkForLikes();
  }

  checkForLikes(): void {
    this.authService.getUserFromToken().subscribe((response) => {
      this.authService.getUserLikesInfo(response.user.user.likes).subscribe((response) => {
        this.userLikes = response.products;
        this.likesTotal += this.userLikes.length;
      })
    })
  }

  get currentUser(): User | null {
    return this.authService.getCurrentUser()
  }
}