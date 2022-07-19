import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
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
  cartItem: ICartItem;

  @Input()
  displayModal: boolean = false;

  @Output()
  displayModalChange = new EventEmitter();

  amountOfProduct: number;
  amountOfProductError: boolean = false;
  private currentCart: ICart;
  cartItems: ICartItem[];
  subscriptions: Subscription[] = [];

  constructor(
    public _cartItemsService: CartItemsService,
    public _cartService: CartService
  ) { }

  ngOnInit(): void {
    let cartsSubscription = this._cartService.followCurrentCart().subscribe(newCart=>{
      this.currentCart = newCart;
    });
    let cartItemsSubscription = this._cartItemsService.followCartItems().subscribe(newCartItems=>{
      this.cartItems = newCartItems
    });
    this.subscriptions.push(cartsSubscription, cartItemsSubscription);

    if(this.product){// if the input is from the add item
      const cartItem= this.cartItems?.find((cartItem) => cartItem.productId==this.product.id);

      if(cartItem){
        this.cartItem = cartItem;
        this.amountOfProduct = cartItem.quantity;
      }
      else{
        this.cartItem =
        {
          name: this.product.name,
          unitPrice: this.product.price,
          quantity: 0,
          imgUrl: this.product.imgUrl,
          productId: this.product.id,
          cartId: this._cartService.getCurrentCart().id
        }
        this.amountOfProduct = 0;
      }
    }
    else{//if the input is from the edit
      this.amountOfProduct = this.cartItem.quantity;
    }
  }

  ngOnDestroy(): void{
    for(let sub of this.subscriptions){
      sub.unsubscribe();
    }
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
      if(this.cartItems.find(cartItem=> cartItem.id == this.cartItem.id)){
        this._cartItemsService.deleteCartItem(this.cartItem.id, this.currentCart.id);
      }
      this.displayModal = false;
      this.displayModalChange.emit(false);
      return;
    }
    else if(this.amountOfProduct>0 && this.amountOfProduct<=10){
      if(!this.cartItem.id){
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
    }
  }


}
