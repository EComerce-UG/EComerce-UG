import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {TuiTextfield} from '@taiga-ui/core';
import {TuiInputNumber} from '@taiga-ui/kit';

import { ProductService } from '../../service/product.service';
import { ProductList } from '../../../interfaces';

interface MyArrayData {
  color: string
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, TuiInputNumber, TuiTextfield, CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  // obteniendo el id del producto
  route: ActivatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  productView: ProductList | undefined;
  productRelatedView: ProductList[] | undefined;
  stars: number;
  myList:MyArrayData[] = []
  Array = Array;
  protected value: number | null = null;
  buttonDescription = signal(false)

  constructor() {
    const currentProductId = Number(this.route.snapshot.params['id']);
    this.productView = this.productService.getProductById(currentProductId);
    this.productRelatedView = this.productService.getRelatedProducts(this.productView?.category);
    this.stars = this.productService.getProductRatig(currentProductId);
    this.stars = Math.round(this.stars);
    this.myList.push({color: "Red"})
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
}
