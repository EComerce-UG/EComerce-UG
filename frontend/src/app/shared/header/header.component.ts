import { ChangeDetectionStrategy, Component, HostBinding, inject, Input, OnInit, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TuiAlertService } from '@taiga-ui/core';
import { Router } from "@angular/router";

import { AuthService } from '../../service/auth.service';
import { ProductList } from '../../../interfaces';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  providers: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuOpen:boolean = false;
  @Input() userIsLoggin: boolean = false;
  likesProductsTotal:number = 0;
  totalOfCartProducts: number = 0;
  private readonly alerts = inject(TuiAlertService);

  constructor(public userAuthService: AuthService, private userRoutes: Router, private userService: UserService, private render: Renderer2) { }

  ngOnInit(): void {
    this.userService.userCountValue.subscribe(count => {
      this.likesProductsTotal = count
    });
    this.userService.userToCardSelect.subscribe(quantity => {
      this.totalOfCartProducts = quantity.length
    });
    this.userService.currenUserLoggin.subscribe(value => {
      if(value) {
        this.render.addClass(document.getElementById('totalLikesNotification'), 'logginNotification');
        this.render.removeClass(document.getElementById('totalLikesNotification'), 'notLoggin')

        this.render.addClass(document.getElementById('totalCartNotification'), 'logginNotification');
        this.render.removeClass(document.getElementById('totalCartNotification'), 'notLoggin')
      }  else {
        this.render.removeClass(document.getElementById('totalLikesNotification'), 'logginNotification');
        this.render.addClass(document.getElementById('totalLikesNotification'), 'notLoggin')

        this.render.removeClass(document.getElementById('totalCartNotification'), 'logginNotification');
        this.render.addClass(document.getElementById('totalCartNotification'), 'notLoggin')
      }
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  checkUserLoggin(userWantsToGo:string): void {
    if(!this.userAuthService.isLoggedIn()) {
      if(userWantsToGo === "my-account") {
        this.userRoutes.navigate([userWantsToGo]);
        return;
      }
      this.alerts.open('No puede realizar tal accion.', {label: 'Cree una cuenta o inicie session.', appearance: 'neutral'}).subscribe();
      return;
    } else {
      this.userRoutes.navigate([userWantsToGo]);
      return;
    }
  }

}