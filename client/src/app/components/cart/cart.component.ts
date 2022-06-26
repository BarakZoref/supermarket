import { Component, OnInit } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    public _cartItemsService: CartItemsService,
    public _cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  deleteCartItem(cartItemId, cartId): void{
    this._cartItemsService.deleteCartItem(cartItemId);
    this._cartItemsService.getCartItems(cartId);
  }

}
