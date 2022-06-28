import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ICartItem from 'src/app/models/icart-item.model';
import ICart from 'src/app/models/icart.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentCartItem: ICartItem;
  displayModal: boolean = false;

  constructor(
    public _cartItemsService: CartItemsService,
    public _cartService: CartService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this._cartService.followCurrentCart().subscribe(newCart=>{
      this.currentCart = newCart;
    })
  }
  currentCart: ICart;

  deleteCartItem(cartItemId): void{
    this._cartItemsService.deleteCartItem(cartItemId, this.currentCart.id);
    // this._cartItemsService.getCartItems(this.currentCart.id);
  }

  deleteAllCartItems(): void{
    this._cartItemsService.deleteAllCartItems(this.currentCart.id);
    // this._cartItemsService.getCartItems(this.currentCart.id);
  }

  editItemQuantity(cartItem): void{
    this.currentCartItem = cartItem;
    this.displayModal = true;
  }

}
