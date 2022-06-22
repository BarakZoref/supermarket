import { Component, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { CartItemsService } from './services/cart-items.service';
import { CartService } from './services/cart.service';
import { OrdersService } from './services/orders.service';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
    private _usersService: UsersService,
    private _ordersService: OrdersService,
    private _cartItemsService: CartItemsService,
    private _cartService: CartService
    ) {}
    ngOnInit(): void {
      
    }

  // async ngOnInit(): Promise<void> {
  //     this.primengConfig.ripple = true;
  //     let userDetails: string = sessionStorage.getItem("userDetails");
  //     if(userDetails){
  //       this._usersService.currentUser = JSON.parse(userDetails);
  //       try{
  //         this._cartService.currentCart = await this._cartService.getLastCart()
  //         this._ordersService.getLastOrderDate();
  //         this._cartItemsService.getCartItems(this._cartService.currentCart.id);
  //       }catch(err){
  //         console.error(err);
  //       }
  //     }
  // }
}
