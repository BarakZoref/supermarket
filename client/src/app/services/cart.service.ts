import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ICart from '../models/icart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  currentCart: ICart;
  private baseUrl: string = "http://localhost:3001/carts/"
  constructor(
    public _http: HttpClient
  ) { }

  public getLastCart(): void{
    this._http.post<any>(this.baseUrl, {})
    .subscribe(cart => {
      this.currentCart = cart;
      console.log(this.currentCart);
    },
      error => {
        console.log(error);
        alert('Add new cart failed');
      }
    )
  }
}
