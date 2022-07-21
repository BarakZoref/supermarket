import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import ICartItem from '../models/icart-item.model';
import ICart from '../models/icart.model';
import IServerResponse from '../models/iserver-response.model';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  totalPrice: number;

  private baseUrl = 'http://localhost:3001/cart_items/'
  constructor(
    public _http: HttpClient,
    private _messageService: MessageService
  ) { }

  private cartItemsSubject = new BehaviorSubject<ICartItem[]>(null);

  followCartItems(): Observable<ICartItem[]>{
    return this.cartItemsSubject.asObservable();
  }

  setCartItems(newCartItems: ICartItem[]): void{
    this.cartItemsSubject.next(newCartItems);
  }

   public addToCart(newCartItem): void{
    this._http.post<any>(this.baseUrl, newCartItem)
    .subscribe(cartItemId => {
      console.log(cartItemId);
      this.getCartItems(newCartItem.cartId)
    },
      error => {
        console.log(error);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Add cart item failed.' });
      }
    )
  }

  public deleteCartItem(cartItemId, cartId): void{
    this._http.delete<IServerResponse>(this.baseUrl + cartItemId)
    .subscribe(serverResponse => {
      console.log(serverResponse.msg);
      this.getCartItems(cartId);
    },
      error => {
        console.log(error);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Deleting cart item failed' });      }
    )
  }

  public updateCartItemQuantity(cartItemDetails): void{
    this._http.put<IServerResponse>(this.baseUrl, cartItemDetails)
    .subscribe(serverResponse => {
      console.log(serverResponse.msg);
      this.getCartItems(cartItemDetails.cartId);
    },
      error => {
        console.log(error);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'update cart quantity failed' });
      }
    )
  }


  public deleteAllCartItems(cartId): void{
    this._http.delete<IServerResponse>(this.baseUrl + '/by_cart_id/' + cartId)
    .subscribe(serverResponse => {
      console.log(serverResponse.msg);
      this.getCartItems(cartId);
    },
      error => {
        console.log(error);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'delete all cart items failed' });
      }
    )
  }

  public getCartItems(cartId): void{
    this._http.get<ICartItem[]>(this.baseUrl + cartId)
    .subscribe(cartItems => {
      this.cartItemsSubject.next(cartItems);
      this.totalPrice = 0;
      for(let cartItem of cartItems){
        this.totalPrice+=cartItem.quantity*cartItem.unitPrice;
      }
    },
      error => {
        console.log(error);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'get cart items failed' });
      }
    )
  }
}
