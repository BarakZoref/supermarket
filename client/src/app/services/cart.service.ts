import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import ICart from '../models/icart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl: string = "http://localhost:3001/carts/"
  constructor(
    public _http: HttpClient,
    private _messageService: MessageService
  ) { }

  private currentCartSubject = new BehaviorSubject<ICart>(null);

  followCurrentCart(): Observable<ICart>{
    return this.currentCartSubject.asObservable();
  }

  setCurrentCart(newCart: ICart): void{
    this.currentCartSubject.next(newCart);
  }

  getCurrentCart(): ICart{
    return this.currentCartSubject.value;
  }

  getLastCart(): void{
    this._http.get<ICart>(this.baseUrl, {})
    .subscribe(cart => {
      if(cart?.isOpen){
        this.currentCartSubject.next(cart);
      }
    },
      error => {
        console.log(error);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'get last cart failed' });
      }
    )
  }

  public openCart(): void{
    this._http.post<ICart>(this.baseUrl, {})
    .subscribe(cart => {
      this.currentCartSubject.next(cart);
    },
      error => {
        console.log(error);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'open cart failed' });
      }
    )
  }
}
