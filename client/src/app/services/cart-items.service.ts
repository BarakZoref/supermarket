import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ICartItem from '../models/icart-item.model';
import IServerResponse from '../models/iserver-response.model';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  cartItems: ICartItem[];
  totalPrice: number;

  private baseUrl = 'http://localhost:3001/cart_items/'
  constructor(
    public _http: HttpClient
  ) { }

   public addToCart(newCartItem): void{
    this._http.post<any>(this.baseUrl, newCartItem)
    .subscribe(cartItemId => {
      //TODO:
      //do something with cartItemId
      console.log(cartItemId);
    },
      error => {
        console.log(error);
        alert('add cart failed');
      }
    )
  }

  public deleteCartItem(cartItemId): void{
    this._http.delete<IServerResponse>(this.baseUrl + cartItemId)
    .subscribe(serverResponse => {
      console.log(serverResponse.msg);
    },
      error => {
        console.log(error);
        alert('deleting cart item failed');
      }
    )
  }

  public updateCartItemQuantity(cartItemDetails): void{
    this._http.put<IServerResponse>(this.baseUrl, cartItemDetails)
    .subscribe(serverResponse => {
      console.log(serverResponse.msg);
    },
      error => {
        console.log(error);
        alert('update cart quantity failed');
      }
    )
  }


  public deleteAllCartItems(cartId): void{
    this._http.delete<IServerResponse>(this.baseUrl + '/by_cart_id/' + cartId)
    .subscribe(serverResponse => {
      console.log(serverResponse.msg);
    },
      error => {
        console.log(error);
        alert('delete all cart items failed');
      }
    )
  }

  public getCartItems(cartId): void{
    this._http.get<ICartItem[]>(this.baseUrl + cartId)
    .subscribe(cartItems => {
      this.cartItems = cartItems
      this.totalPrice = 0;
      for(let cartItem of cartItems){
        this.totalPrice+=cartItem.quantity*cartItem.unitPrice;
      }
      console.log("cart items: ", this.cartItems)
    },
      error => {
        console.log(error);
        alert('delete all cart items failed');
      }
    )
  }
}
