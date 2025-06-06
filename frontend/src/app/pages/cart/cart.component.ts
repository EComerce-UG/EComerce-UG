import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ProductListToCart } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

// taiga
import {tuiClamp} from '@taiga-ui/cdk';
import { TuiAlertService, TuiDialogService, TuiLoader, TuiDialogContext, TuiNumberFormat } from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import type {PolymorpheusContent} from '@taiga-ui/polymorpheus';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, TuiAvatar, TuiNumberFormat],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  userCurrentCartSelect:[]|ProductListToCart[] = [];
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);
  protected money = 1000;
  showSpinnView: boolean = true;
  totalCost:number = 0;
  tempCost:number = 0;

  constructor(private userService: UserService, private authService: AuthService) { }

  protected onElastic(value: number, {style}: HTMLElement): void {
    const scale = tuiClamp(value, 0.7, 1);

    style.setProperty('transform', `scale(${scale})`);
    style.setProperty('width', `calc((100% + 3.5rem) / ${scale})`);
  }
	 
  protected withdraw(): void {
      this.money -= 100;
  }

  ngOnInit(): void { 
    this.userService.userToCardSelect.subscribe((dataCartCurrent) => {
      console.log(dataCartCurrent)
      this.userCurrentCartSelect = dataCartCurrent;
    });
    this.userService.userCartTotalCost.subscribe((value) => {
      this.totalCost = value;
    });
    this.showSpinnView = false;
  }

  // eliminar un producto
  deleteCartProduct(productId:number):void {
    let deletedProduct: ProductListToCart | undefined = this.userCurrentCartSelect.find(value => value.id === productId);
    if(this.userService.deleteUserCart(productId)) {
      this.authService.deleteFirebaseCartUser().subscribe();
      this.alerts.open('Producto agregado!', {label: `Producto ${deletedProduct?.name.toLocaleLowerCase()} fue agregado!`, appearance: 'positive', closeable: false, autoClose: 1500}).subscribe();
      return;
    }

    this.alerts.open('Error al tratar de comprar producto', {label: `Porfavor, contacte al servicio IT`, appearance: 'warning', closeable: false, autoClose: 3000}).subscribe();
  }

  sendCheckoutData(content: PolymorpheusContent): void {
    if(this.userService.userToCardSelect.value.length !== 0) {
      this.tempCost = this.totalCost;
      if(this.authService.checkoutFirebaseCartUser().subscribe()) {
        this.userService.userToCardSelect.next([])
        this.userService.updateCartValueSingleton(0);
        this.dialogs.open(content).subscribe();
      }
        return;
    }
    this.alerts.open('Porfavor, agregue productos para poder realizar pagos', {label: `Error en pago`, appearance: 'warning', closeable: false, autoClose: 3000}).subscribe();
    return;
  }

}
