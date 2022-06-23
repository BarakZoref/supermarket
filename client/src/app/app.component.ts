import { Component, OnInit} from '@angular/core';
import { CartItemsService } from './services/cart-items.service';
import { CartService } from './services/cart.service';
import { OrdersService } from './services/orders.service';
import { StateService } from './services/state.service';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    // private _usersService: UsersService,
    // private _ordersService: OrdersService,
    // private _cartItemsService: CartItemsService,
    // private _cartService: CartService
    private _stateService: StateService,
    ) {}


  //   async ngOnInit(): Promise<void> {
  //     this.primengConfig.ripple = true;
  //     let userDetails: string = sessionStorage.getItem("userDetails");
  //     if(userDetails){
  //       this._usersService.currentUser = JSON.parse(userDetails);
  //       try{
  //         this._cartService.currentCart = await this._cartService.getLastCart()
  //         if(!this._cartService.currentCart){
  //           this._ordersService.getLastOrderDate();
  //         }
  //         else{
  //           this._cartItemsService.getCartItems(this._cartService.currentCart.id);
  //         }
  //       }catch(err){
  //         console.error(err);
  //       }
  //     }
  // }
}
