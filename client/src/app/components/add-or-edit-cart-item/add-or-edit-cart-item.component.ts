import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import ICartItem from 'src/app/models/icart-item.model';
import ICart from 'src/app/models/icart.model';
import IProduct from 'src/app/models/iproduct.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-or-edit-cart-item',
  templateUrl: './add-or-edit-cart-item.component.html',
  styleUrls: ['./add-or-edit-cart-item.component.css']
})
export class AddOrEditCartItemComponent implements OnInit {

  @Input()
  product: IProduct;

  @Input()
  displayModal: boolean = false;

  @Output()
  displayModalChange = new EventEmitter();

  amountOfProduct: number;
  amountOfProductError: boolean = false;
  cartItem: ICartItem;
  private currentCart: ICart;

  constructor(
    public _cartItemsService: CartItemsService,
    public _cartService: CartService
  ) { }

  ngOnInit(): void {
    const cartItem= this._cartItemsService.cartItems?.find((cartItem) => cartItem.productId==this.product.id);
    console.log("cart item!", cartItem);

    if(cartItem){
      this.cartItem = cartItem;
      this.amountOfProduct = cartItem.quantity;
    }
    else{
      this.amountOfProduct = 0;
    }
    this._cartService.followCurrentCart().subscribe(newCart=>{
      this.currentCart = newCart;
    })
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
      this.displayModalChange.emit(false);
      return;
    }
    else if(this.amountOfProduct>0 && this.amountOfProduct<=10){
      if(!this.cartItem){
        this._cartItemsService.addToCart(
          {
            productId: this.product.id,
            quantity: this.amountOfProduct,
            cartId: this.currentCart.id
          });
      }
      else if(this.cartItem.quantity!=this.amountOfProduct){
        this._cartItemsService.updateCartItemQuantity(
          {
            quantity: this.amountOfProduct,
            cartItemId: this.cartItem.id,
            cartId: this.currentCart.id
          }
        )
      }
      this.displayModal = false;
      this.displayModalChange.emit(false);
      // this._cartItemsService.getCartItems(this.currentCart.id);
    }
  }


}
