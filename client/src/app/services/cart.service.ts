import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import ICart from '../models/icart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private currentCart: ICart;
  private baseUrl: string = "http://localhost:3001/carts/"
  constructor(
    public _http: HttpClient
  ) { }

  private currentCartSubject = new BehaviorSubject<ICart>(null);

  followCurrentCart(): Observable<ICart>{
    return this.currentCartSubject.asObservable();
  }

  setCurrentCart(newCart: ICart): void{
    this.currentCart = newCart;
    this.currentCartSubject.next(newCart);
  }

  getLastCart(): void{
    this._http.get<ICart>(this.baseUrl, {})
    .subscribe(cart => {
      this.currentCartSubject.next(cart);
      console.log(this.currentCart);
    },
      error => {
        console.log(error);
        alert('get last cart failed');
      }
    )
  }

  public openCart(): void{
    this._http.post<ICart>(this.baseUrl, {})
    .subscribe(cart => {
      this.currentCart = cart;
      console.log(this.currentCart);
    },
      error => {
        console.log(error);
        alert('open cart failed');
      }
    )
  }
}
