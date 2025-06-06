import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, Renderer2, signal } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TuiTextfield, TuiAlertService } from '@taiga-ui/core';
import { TuiInputNumber } from '@taiga-ui/kit';

import { ProductService } from '../../service/product.service';
import { ProductList, ProductListToCart } from '../../../interfaces';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, TuiInputNumber, TuiTextfield, CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  // obteniendo el id del producto
  route: ActivatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  productView: ProductList;
  productRelatedView: ProductList[] | undefined;
  stars: number;
  itsInUserLike: boolean = false;
  itsAlreadyCart: boolean = false;
  Array = Array;
  protected value: number = 1;
  buttonDescription = signal(false);
  private readonly alerts = inject(TuiAlertService);

  constructor(private userAuth: AuthService, private viewportScroller: ViewportScroller, private userService: UserService, private render: Renderer2) {
    const currentProductId = Number(this.route.snapshot.params['id']);
    this.itsInUserLike = this.route.snapshot.params['isLiked'] === 'true' ? true : false;
    this.productView = this.productService.getProductById(currentProductId);
    this.productRelatedView = this.productService.getRelatedProducts(this.productView?.category);
    this.stars = this.productService.getProductRatig(currentProductId);
    this.stars = Math.round(this.stars);
    viewportScroller.scrollToPosition([0,0])
  }

  ngOnInit(): void {
    if(this.itsInUserLike)
      this.render.addClass(document.getElementById('likedProductAlready'), "like-button");
    this.userService.userToCardSelect.subscribe((cartValues) => {
      cartValues.forEach((value) => {
        if(value.id === this.productView.id) {
          this.itsAlreadyCart = true
        }
      })
    })
  }

  get relatedProductsList() {
    return this.productRelatedView
  }

  // TO-DO
  // Porfavor, arreglemos esto, no me siento orgulloso de esto, pero ya son las 3 a.m.
  showInfo1 = "";
  showBold1 = "font-bold";
  showInfo2 = "hidden";
  showBold2 = "";
  showInfo3 = "hidden";
  showBold3 = "";
  disableDescriptionButton(currentButton: number) {
    switch(currentButton) {
      case 1:
        this.showInfo1 = "";
        this.showBold1 = "font-bold";

        this.showInfo2 = "hidden";
        this.showBold2 = "";

        this.showInfo3 = "hidden";
        this.showBold3 = "";
        break
      case 2:
        this.showInfo1 = "hidden";
        this.showBold1 = "";

        this.showInfo2 = "";
        this.showBold2 = "font-bold";

        this.showInfo3 = "hidden";
        this.showBold3 = "";
        break
      case 3:
        this.showInfo1 = "hidden";
        this.showBold1 = "";

        this.showInfo2 = "hidden";
        this.showBold2 = "";

        this.showInfo3 = "";
        this.showBold3 = "font-bold";
        break
      default: 
        break
    }
  }
  // TO-DO

  sendToCart(productId:number):void {
    if(!this.userAuth.isLoggedIn()){
      this.alerts.open('Please login to add this product.', {label: 'Curretly not loggin', appearance: 'warning'}).subscribe()
    }

    const productInfo: ProductListToCart = this.productService.getProductByIdCart(productId, this.value);
    this.userService.updateUserCardSelect(productInfo)
    this.userService.updateCartValue(productInfo);
    this.userAuth.addFirebaseCartUser(productInfo).subscribe();
    this.alerts.open('Producto agregado!', {label: `Producto ${productInfo?.name.toLocaleLowerCase()} fue agregado!`, appearance: 'positive', closeable: false, autoClose: 1500}).subscribe();
  }
}
