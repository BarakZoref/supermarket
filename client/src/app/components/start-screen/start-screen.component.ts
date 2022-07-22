import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { OrdersService } from 'src/app/services/orders.service';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';
import IUser from 'src/app/models/iuser.model';
import ICart from 'src/app/models/icart.model';
import { Subscription } from 'rxjs';
import ICartItem from 'src/app/models/icart-item.model';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor(
    public _productsService: ProductsService,
    public _ordersService: OrdersService,
    public _cartItemsService: CartItemsService,
    private _cartService: CartService,
    private _usersService: UsersService
  ) { }

  subscriptions: Subscription[] = [];
  cartItems: ICartItem[];


  ngOnInit(): void {
    this._productsService.getAmountOfProducts();
    this._ordersService.getAmountOfOrders();
    let usersSubscription = this._usersService.followCurrentUser().subscribe(newUser=>{
      this.currentUser = newUser;
    });
    let cartSubscription = this._cartService.followCurrentCart().subscribe(newCart=>{
      this.currentCart = newCart
    });
    let cartItemsSubscription = this._cartItemsService.followCartItems().subscribe(newCartItems =>{
      this.cartItems = newCartItems
    })
    this.subscriptions.push(usersSubscription, cartSubscription), cartItemsSubscription;
  }

  ngOnDestroy(): void{
    for(let sub of this.subscriptions){
      sub.unsubscribe();
    }
  }

  currentUser: IUser;
  currentCart: ICart;

}
