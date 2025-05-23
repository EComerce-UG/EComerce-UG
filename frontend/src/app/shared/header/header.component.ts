import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TuiAlertService } from '@taiga-ui/core';
import { Router } from "@angular/router";

import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  menuOpen = false;
  private readonly alerts = inject(TuiAlertService);

  constructor(public userService: AuthService, private userRoutes: Router) { }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  checkUserLoggin(userWantsToGo:string): void {
    if(!this.userService.isLoggedIn()) {
      if(userWantsToGo === "my-account") {
        this.userRoutes.navigate([userWantsToGo]);
        return;
      }
      this.alerts.open('Please login to start buying.', {label: 'Curretly not loggin', appearance: 'warning'}).subscribe();
      return;
    } else {
      this.userRoutes.navigate([userWantsToGo]);
      return;
    }
  }
}