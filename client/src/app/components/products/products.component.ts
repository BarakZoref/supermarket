import { Component, OnInit } from '@angular/core';
import ICart from 'src/app/models/icart.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
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
  private currentCart: ICart;

  constructor(
    public _categoriesService: CategoriesService,
    public _productsService: ProductsService,
    public _cartItemsService: CartItemsService,
    public _cartService: CartService
  ) { }

  ngOnInit(): void {
    this._categoriesService.getAllCategories();
    this._productsService.getAllProducts();
    this._cartService.followCurrentCart().subscribe(newCart=>{
      this.currentCart = newCart
    })
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
      const cartItem= this._cartItemsService.cartItems.find((cartItem) => cartItem.productId==this.currentProductId);
      if(!cartItem){
        this._cartItemsService.addToCart(
          {
            productId: this.currentProductId,
            quantity: this.amountOfProduct,
            cartId: this.currentCart.id
          });
      }
      else{
        this._cartItemsService.updateCartItemQuantity(
          {
            quantity: cartItem.quantity + this.amountOfProduct,
            cartItemId: cartItem.id
          }
        )
      }
      this.displayModal = false;
    }
    this._cartItemsService.getCartItems(this.currentCart.id);
    this.amountOfProduct = 0;
  }

}
