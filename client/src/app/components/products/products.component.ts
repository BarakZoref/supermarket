import { Component, OnInit } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayModal: boolean = false;
  amountOfProduct: number = 0;
  currentProductId: number;
  amountOfProductError: boolean = false;

  constructor(
    public _categoriesService: CategoriesService,
    public _productsService: ProductsService,
    public _cartItemsService: CartItemsService
  ) { }

  ngOnInit(): void {
    this._categoriesService.getAllCategories();
    this._productsService.getAllProducts();
  }

  onSpecificCategoryClicked(categoryId){
    this._productsService.getProductsByCategoryId(categoryId)
  }

  onAllProductsCategoryClicked(){
    this._productsService.getAllProducts();
  }

  onAddToCartClicked(productid){
    this.currentProductId = productid;
    this.displayModal = true;
    console.log(this.currentProductId);
  }

  onMinusButtonClicked(){
    if(this.amountOfProduct<=0){
      this.amountOfProduct = 0;
    }
    else if(this.amountOfProduct>10){
      this.amountOfProduct = 10;
    }
    else{
      this.amountOfProduct--;
    }
  }

  onPlusButtonClicked(){
    if(this.amountOfProduct<0){
      this.amountOfProduct = 0;
    }
    else if(this.amountOfProduct>=10){
      this.amountOfProduct = 10;
    }
    else{
      this.amountOfProduct++;
    }
  }

  onChooseAmountOfProductClicked(){
    if(this.amountOfProduct == 0){
      this.displayModal = false;
      return;
    }
    else if(this.amountOfProduct>0 && this.amountOfProduct<=10){
      //TODO:
      //Add item to cart or update quantity
      this.displayModal = false;
    }
    this.amountOfProduct = 0;
  }

}
